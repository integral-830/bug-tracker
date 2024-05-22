import { Box } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton'

const IssueFormSkeleton = () => {
  return (
    <Box m='6'>
      <Skeleton height='2rem'/>
      <Skeleton className=' my-11 ' height='25rem'/>
    </Box>
  )
}

export default IssueFormSkeleton