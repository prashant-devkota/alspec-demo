import axios from 'axios';
import appConfig from '@/configs/app.config';
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from '@/constants/api.constant';
import { PERSIST_STORE_NAME } from '@/constants/app.constant';
import deepParseJson from '@/utils/deepParseJson';
import parseJwt from '@/utils/authVerify';
import store, { signOutSuccess } from '../store';
import { signOut } from '@/utils/authUtils';

const unauthorizedCode = [401]

const BaseService = axios.create({
    timeout: 60000,
    baseURL: appConfig.apiPrefix,
})

BaseService.interceptors.request.use(
    (config: any) => {
        let accessToken: string = '';
        if (config.url.indexOf("account/login") === -1) {
            const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME);
            const persistData = deepParseJson(rawPersistData);
            accessToken = (persistData as any).auth.session.token;
            const { auth } = store.getState();
            const portfolioId = auth.user.portfolioId;
            config.headers['portfolioId'] = portfolioId;
        }

        if (!accessToken) {
            const { auth } = store.getState();
            accessToken = auth.session.token as string;
        }

        if (accessToken) {
            const parseJwtt = parseJwt(accessToken);
            if (parseJwtt.exp * 1000 < Date.now()) {
                signOut();
            }
            config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`
        }

        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

BaseService.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error

        if (response && unauthorizedCode.includes(response.status)) {
            store.dispatch(signOutSuccess())
        }

        return Promise.reject(error)
    }
)

export default BaseService
