export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: import.meta.env.VITE_API_PREFIX as string,
    authenticatedEntryPath: '/summary',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'en',
    enableMock: false,
}
const mode = process.env.NODE_ENV || 'development';
console.log(mode)
console.log('mode url:', import.meta.env.VITE_API_PREFIX);
console.log('API url:', import.meta.env.MODE);
console.log('API name:', import.meta.env.VITE_APP_NAME);
export default appConfig
