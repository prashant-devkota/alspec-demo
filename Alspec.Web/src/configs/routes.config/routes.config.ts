import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [

    {
        key: 'summary',
        path: '/',
        component: lazy(() => import('@/views/mainDashboard')),
        authority: [],
        meta: {
            header: 'Jobs List',
            headerContainer: true,
        }
    },{
        key: 'summary',
        path: '/summary',
        component: lazy(() => import('@/views/mainDashboard')),
        authority: [],
        meta: {
            header: 'Jobs List',
            headerContainer: true,
        }
    }
]