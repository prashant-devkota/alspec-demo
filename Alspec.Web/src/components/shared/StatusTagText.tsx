import type { CommonProps } from '@/@types/common'
import { Tag } from '../ui'

export interface StatusTagTextProps extends CommonProps {
    status?: string,
}

const StatusTagText = ({ status }: StatusTagTextProps) => {
    switch (status) {
        case 'New':
            return <Tag className="rounded-md">New</Tag>
        case 'Active':
            return (
                <Tag className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100 border-0 rounded">
                    Active
                </Tag>
            )
        case 'Resolved':
            return (
                <Tag className="tag bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100  border-0 rounded">
                    Resolved
                </Tag>
            )
        case 'Closed':
            return (
                <Tag className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100 border-0 rounded">
                    Closed
                </Tag>
            )
        default:
            return <></>
    }
}

export default StatusTagText
