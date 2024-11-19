import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type UserState = {
    userId: string
    avatar?: string
    fullName?: string
    email?: string
    role: string
    authority?: string[]
    portfolioId?: string
}

const initialState: UserState = {
    userId: '',
    avatar: '',
    fullName: '',
    email: '',
    role: '',
    authority: [],
    portfolioId: ''
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.userId = action.payload?.userId;
            state.avatar = action.payload?.avatar;
            state.email = action.payload?.email;
            state.fullName = action.payload?.fullName;
            state.role = action.payload?.role;
            state.authority = action.payload?.authority;
            state.portfolioId = action.payload.portfolioId;
        },
        updatePortfolio(state, action: any) {
            state.portfolioId = action.payload.value;
            state.role = action.payload.role;
        }
    },
})

export const { setUser, updatePortfolio } = userSlice.actions
export default userSlice.reducer
