import ApiService from './ApiService'
import type {
    SignInCredential,
    ChangePassword,
    SignUpCredential,
    ForgotPassword,
    ResetPassword
} from '@/@types/auth'

export async function apiSignIn(data: SignInCredential) {
    return ApiService.fetchData({
        url: '/account/login',
        method: 'post',
        data,
    })
}

export async function apiSignUp(data: SignUpCredential) {
    return ApiService.fetchData({
        url: '/account/sign-up',
        method: 'post',
        data,
    })
}

export async function apiSignOut() {
    return ApiService.fetchData({
        url: '/sign-out',
        method: 'post',
    })
}

export async function apiForgotPassword(data: ForgotPassword) {
    return ApiService.fetchData({
        url: 'account/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data: ResetPassword) {
    return ApiService.fetchData({
        url: 'account/reset-password',
        method: 'post',
        data,
    })
}

export async function apiChangePassword(data: ChangePassword) {
    return ApiService.fetchData({
        url: 'account/change-password',
        method: 'post',
        data,
    })
}

export async function apiUpdatePassword(data: any) {
    return ApiService.fetchData({
        url: 'account/update-password',
        method: 'post',
        data,
    })
}