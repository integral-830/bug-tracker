import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
        <Heading>{issue.title}</Heading>
        <Flex gap='3' align='center'>
            <IssueStatusBadge status={issue.status}/>
            <Text weight='medium'>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card my='7' className='prose max-w-full'>
            <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
    </>
  )
}

export default IssueDetails