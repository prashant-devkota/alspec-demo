import { apiSignIn, apiSignUp } from '@/services/AuthService'
import {
    setUser,
    signInSuccess,
    signOutSuccess,
    useAppSelector,
    useAppDispatch,
} from '@/store'
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import type { SignInCredential, SignUpCredential } from '@/@types/auth';
import ToastService from '@/services/ToastService'

type Status = 'success' | 'failed'

function useAuth() {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const query = useQuery();

    const { token, signedIn } = useAppSelector((state) => state.auth.session);

    const signIn = async (values: SignInCredential): Promise<| { status: Status, message: string } | undefined> => {
        try {
            const response = await apiSignIn(values);
            if (response.success) {
                const token = response.data.accessToken;
                dispatch(signInSuccess(token))
                if (response.data.loginInfo) {
                    dispatch(
                        setUser(response.data.loginInfo)
                    );
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )

                return {
                    status: 'success',
                    message: ''
                }
            } else {
                return {
                    status: 'failed',
                    message: response.errorMessages[0] || 'Something went wrong'
                }
            }
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const signUp = async (values: SignUpCredential) => {
        try {
            const response = await apiSignUp(values);
            if (response.success) {
                ToastService.showToast('Success', 'Transaction completed successfully', 'success');
                navigate('/sign-in')
            } else {
                return {
                    status: 'failed',
                    message: response.errorMessages[0] || 'Something went wrong'
                }
            }
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const handleSignOut = () => {
        dispatch(signOutSuccess())
        dispatch(
            setUser({
                userId: '',
                role: '',
                avatar: '',
                fullName: '',
                email: '',
                portfolioId: '',
                authority: [],
            })
        )
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        handleSignOut();
    }

    return {
        authenticated: token && signedIn,
        signIn,
        signUp,
        signOut,
    }
}

export default useAuth
