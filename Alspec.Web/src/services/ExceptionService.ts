import { NavigateFunction } from 'react-router-dom';
import ToastService from '@/services/ToastService';
import { HttpStatusCode } from 'axios';

const processException = (exception: any, redirect: boolean = true, navigate?: NavigateFunction,) => {
    console.log(exception);

    let errorMessage: string;

    if (exception === HttpStatusCode.NotFound || exception?.response?.status === HttpStatusCode.NotFound) {
        errorMessage = 'Not Found';
    } else if (
        exception === '403' ||
        exception?.response?.status === HttpStatusCode.Forbidden ||
        (exception != null && exception.error?.error?.innererror != null && exception.error.error.innererror.type === 'System.UnauthorizedAccessException')
    ) {
        errorMessage = '🔒 Unauthorized';
    } else if (exception === '400' || exception?.response?.status === '400') {
        errorMessage = 'Bad Request';
    } else {
        errorMessage = 'Internal Server Error';
    }

    if (window.location.href.indexOf('/error') === -1) {
        if (redirect && navigate) {
            navigate(`/access-denied`);
        } else {
            ToastService.showToast('Failed', errorMessage ?? 'Something went wrong', 'danger');
        }
    }
};

export {
    processException
};
