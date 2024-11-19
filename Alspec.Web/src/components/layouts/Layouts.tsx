import { useMemo, lazy, Suspense } from 'react'
import Loading from '@/components/shared/Loading'
import {
    LAYOUT_TYPE_MODERN
} from '@/constants/theme.constant'
import useAuth from '@/utils/hooks/useAuth'
import useDirection from '@/utils/hooks/useDirection'
import useLocale from '@/utils/hooks/useLocale'

const layouts = {
    [LAYOUT_TYPE_MODERN]: lazy(() => import('./ModernLayout')),
}

const Layout = () => {
    const authenticated = true;

    useDirection()

    useLocale()

    const AppLayout = useMemo(() => {
        if (authenticated) {
            return layouts[LAYOUT_TYPE_MODERN]
        }
    }, [LAYOUT_TYPE_MODERN, authenticated])

    return (
        <Suspense
            fallback={
                <div className="flex flex-auto flex-col h-[100vh]">
                    <Loading loading={true} />
                </div>
            }
        >
            <AppLayout />
        </Suspense>
    )
}

export default Layout
