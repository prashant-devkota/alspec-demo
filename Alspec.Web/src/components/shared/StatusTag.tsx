import type { CommonProps } from '@/@types/common';
import { Tag } from '../ui';

export interface StatusTagProps extends CommonProps {
    isActive?: boolean,
    type?: 'default' | 'yesno' | 'text'
}

const StatusTag = ({ isActive, type = 'default' }: StatusTagProps) => {
    switch (isActive) {
        case true:
            return (
                <Tag className="tag bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100  border-0 rounded">
                    {type == 'default' ? 'Active' : 'Yes'}
                </Tag>
            )
        case false:
            return (
                <Tag className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100  border-0 rounded">
                    {type == 'default' ? 'Inactive' : 'No'}
                </Tag>
            )
        default:
            return <></>
    }
}

export default StatusTag
