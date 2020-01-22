import axios from 'axios';
import C from '../constants'

export default function dispatchAPI(api) {
    console.log('api', api)
    if (api.reqType === 'MULTIPART') {
        return dispatch => {
            dispatch(apiStatusAsync(true, false, ''))
            axios.post(api.apiEndPoint(), api.getFormData(), api.getHeaders())
                .then(function (res) {
                    api.processResponse(res.data)
                    dispatch(apiStatusAsync(false, false, null, res.data))
                    dispatch(dispatchAPIAsync(api));
                    if (typeof api.getNextStep === 'function' && res.data && (res.status == 200 || res.status == 201))
                        dispatch(api.getNextStep())
                })
                .catch(function (err) {
                    dispatch(apiStatusAsync(false, true, 'api failed', null, err.response.status === 401 ? true : false))
                });
        }
    }
    else {
        if (api.method === 'POST') {
            return dispatch => {
                dispatch(apiStatusAsync(true, false, ''))
                console.log("adasdasdasd", api.apiEndPoint(), api.getBody(), api.getHeaders())
                axios.post(api.apiEndPoint(), api.getBody(), api.getHeaders())
                    .then(function (res) {
                        console.log("helo res", res)
                        api.processResponse(res.data)
                        dispatch(apiStatusAsync(false, false, null, res.data))
                        dispatch(dispatchAPIAsync(api));
                        if (typeof api.getNextStep === 'function' && res.data && (res.status == 200 || res.status == 201))
                            dispatch(api.getNextStep())
                    })
                    .catch(function (err) {
                        console.log("helo err", err)
                        if (api.type === 'ocr_process') {
                            dispatch(apiStatusAsync(false, true, 'ocr process failed', null, err.response.status === 401 ? true : false))
                        } else {
                            dispatch(apiStatusAsync(false, true, 'wrong credentials', null, err.response.status === 401 ? true : false))
                        }
                    });
            }
        } else if (api.method === 'DELETE') {
            return dispatch => {
                dispatch(apiStatusAsync(true, false, ''))
                axios.delete(api.apiEndPoint(), api.getHeaders())
                    .then(function (res) {
                        api.processResponse(res.data)
                        dispatch(apiStatusAsync(false, false, null, res.data))
                        dispatch(dispatchAPIAsync(api));
                        if (typeof api.getNextStep === 'function' && res.data && (res.status == 200 || res.status == 201))
                            dispatch(api.getNextStep())
                    })
                    .catch(function (err) {
                        dispatch(apiStatusAsync(false, true, 'api failed', null, err.response.status === 401 ? true : false))
                    });
            }
        } else {
            return dispatch => {
                dispatch(apiStatusAsync(true, false, ''))
                axios.get(api.apiEndPoint(), api.getHeaders())
                    .then(function (res) {
                        api.processResponse(res.data)
                        dispatch(apiStatusAsync(false, false, null, res.data))
                        dispatch(dispatchAPIAsync(api));
                        if (typeof api.getNextStep === 'function' && res.data && (res.status == 200 || res.status == 201))
                            dispatch(api.getNextStep())
                    })
                    .catch(function (err) {
                        if (err.response)
                            dispatch(apiStatusAsync(false, true, 'api failed', null, err.response.status === 401 ? true : false))
                    });
            }
        }
    }
}


function dispatchAPIAsync(api) {
    return {
        type: api.type,
        payload: api.getPayload()
    }
}

function apiStatusAsync(progress, error, message, res = null, unauthorized = false) {
    if (res === null || !(res.status && res.status.statusCode && res.status.statusCode !== 200 && res.status.statusCode !== 201)) {
        return {
            type: C.APISTATUS,
            payload: {
                progress: progress,
                error: error,
                message: message,
                unauthorized: unauthorized
            }
        }
    }
    else {
        return {
            type: C.APISTATUS,
            payload: {
                progress: progress,
                error: (res.status.statusCode === 200 || res.status.statusCode === 201) ? false : true,
                message: (res.status.statusCode === 200 || res.status.statusCode === 201) ? message : res.status.errorMessage,
                unauthorized: unauthorized
            }
        }
    }
}
