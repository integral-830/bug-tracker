'use client'
import React, { useState } from 'react'
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 
import { Button, Callout, Spinner, TextField } from '@radix-ui/themes';
import{ z } from 'zod';
import { issueSchema } from '@/app/validation';
import  ErrorMessage  from '@/app/components/ErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { IssueStatusBadge } from '@/app/components';
import SimpleMDE from 'react-simplemde-editor'

type IssueFormData = z.infer<typeof issueSchema>

const IssueForm = ({ issue }: { issue?: Issue}) => {

    const router = useRouter();
    const {register, control, handleSubmit, formState: { errors },} = useForm<IssueFormData>({ resolver: zodResolver(issueSchema)});
    const [error,setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    const onSubmit = handleSubmit( async (data)=>{
        try {
            setSubmitting(true)
            if ( issue ){ 
                await axios.patch('/api/issues/' + issue.id, data );
            }
            else{
                await axios.post('/api/issues/', data );
            }
            router.push('/issues/list')
            router.refresh();
        } catch (error) {
            setSubmitting(false)
            setError('An unexpected error occured.')
        }
    })

    return (
        <div className='m-10'>
            { error && (
                <Callout.Root>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
           <form  className='my-3 space-y-3' onSubmit={ onSubmit } >
                <TextField.Root defaultValue={issue?.title} placeholder="Enter the title" {...register('title')}></TextField.Root>
                <ErrorMessage>{ errors.title?.message }</ErrorMessage>
                { issue && <IssueStatusBadge status={issue!.status}/>}
                { !issue && <IssueStatusBadge status='OPEN'/>}
                <Controller
                    name='description'
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) =><SimpleMDE placeholder='Enter your description' {...field} />}   
                />
                <ErrorMessage>{ errors.description?.message }</ErrorMessage>
                <Button disabled={ isSubmitting }>
                    { issue ? 'Update Issue' : 'Submit New Issue' }{' '}
                    { isSubmitting && <Spinner/> } 
                </Button>
            </form> 
        </div>
        
    )
}

export default IssueForm