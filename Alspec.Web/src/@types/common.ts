/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, CSSProperties } from 'react'

export interface DataSourceResponse {
    data: any;
    total: number
}

export interface ApiResponse extends BaseResponse {
    data: any;
}

export interface BaseResponse {
    success: boolean;
    errorMessages: string[];
}

export interface CommonProps {
    className?: string
    children?: ReactNode
    style?: CSSProperties
}

export type TableQueries = {
    total?: number
    pageIndex?: number
    pageSize?: number
    filterData: {
        name: '',
        status: ''
    }
    sort?: {
        order: 'asc' | 'desc' | ''
        key: string | number
    }
}
