import ApiService from './ApiService'

async function getAllJobs() {
    return ApiService.fetchDataSource({
        url: '/jobs',
        method: 'get'
    })
}

async function createJob(data: any) {
    return ApiService.fetchData({
        url: '/jobs',
        method: 'post',
        data,
    })
}

async function getJobById(jobId: string) {
    return ApiService.fetchData({
        url: '/jobs/' + jobId,
        method: 'get',
    })
}

export {
    getAllJobs,
    createJob,
    getJobById
};