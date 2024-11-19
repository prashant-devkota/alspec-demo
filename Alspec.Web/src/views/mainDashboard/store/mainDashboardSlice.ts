import { createSlice } from '@reduxjs/toolkit';
export type Statistic = {
    key: string
    label: string
    value: number
    growShrink: number
}

export type DashboardData = {
    statisticData: Statistic[]
}

export type MainDashboardState = {
    loading: boolean
    overviewDialogOpen: boolean
    dashboardData: Partial<DashboardData>
}

export const SLICE_NAME = 'mainDashboard';

const initialState: MainDashboardState = {
    loading: true,
    overviewDialogOpen: false,
    dashboardData: {},
}

const mainDashboardSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setDrawerOpen: (state) => {
            state.overviewDialogOpen = true;
        },
        setDrawerClose: (state) => {
            state.overviewDialogOpen = false;
        }
    }
})

export const {
    setDrawerOpen,
    setDrawerClose,
} = mainDashboardSlice.actions

export default mainDashboardSlice.reducer;