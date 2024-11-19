import { ApiResponse, DataSourceResponse } from '@/@types/common';
import BaseService from './BaseService';
import type { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

const ApiService = {
    fetchData: (param: AxiosRequestConfig): Promise<ApiResponse> => {
        return new Promise<ApiResponse>((resolve, reject) => {
            BaseService(param)
                .then((response: AxiosResponse<ApiResponse>) => {
                    resolve(response.data);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    },

    fetchDataSource: (param: AxiosRequestConfig): Promise<DataSourceResponse> => {
        return new Promise<DataSourceResponse>((resolve, reject) => {
            BaseService(param)
                .then((response: AxiosResponse<DataSourceResponse>) => {
                    resolve(response.data);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    },
};

export default ApiService
