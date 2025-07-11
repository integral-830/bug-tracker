import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

const statusMap: Record< Status, {lable: string, color: "orange" | "violet" | "green" }> = {
    OPEN: { lable: 'Open', color: 'orange'},
    IN_PROGRESS: { lable: 'In Progress', color: 'violet'},
    CLOSED: { lable: 'Closed', color: 'green'}
}

const IssueStatusBadge = ({ status }: { status: Status}) => {
  return (
    <Badge radius= 'medium' color={statusMap[status].color}>{statusMap[status].lable}</Badge>
  )
}

export default IssueStatusBadge