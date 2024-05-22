import { Box, Card, Flex } from '@radix-ui/themes';
import { Skeleton } from '@/app/components';

const LoadingIssueDetailPage = () => (
  <Box>
    <Skeleton className='mx-6' width='30rem'/>
    <Flex gap='3' align='center' mx='5'>
      <Skeleton width='5rem'/>
      <Skeleton width='8rem'/>
    </Flex>
    <Card mx='5' my='7' className='prose'>
      <Skeleton count={3}/>
    </Card>
  </Box>
)

export default LoadingIssueDetailPage