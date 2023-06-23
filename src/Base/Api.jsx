// todo: https://stackoverflow.com/questions/73017619/axios-not-respecting-content-type-header

import { renderToStaticMarkup } from 'react-dom/server'
import axios from 'axios'
import Account from './Account'
import app from './App'
import unauthorizedJsx from './UnauthorizedHtml'

const requestConfig = {
    onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log(percentCompleted)
    }
}

const axiosApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

const requestInterceptor = config => {
    config.headers['X-Client'] = 'React'
    if (localStorage.getItem('locale')) {
        config.headers['Locale'] = localStorage.getItem('locale')
    }
    return Account.updateToken(() => {
        config.headers.Authorization = `Bearer ${app.token()}`
        return Promise.resolve(config)
    })
}

const errorInterceptor = async error => {
    if (error.code === 'ERR_NETWORK') {
        return Promise.reject('Network is not connected, or API is down, or API is not configured for CORS.')
    }
    if (error.response === undefined) {
        return Promise.reject(error.message ? error.toString() : 'Unknown error')
    }
    if (error.response.status === 401 || (error.response.status === 500 && error.response.data === "An error occured processing your authentication.")) {
        var url = new URL(app.createLogoutUrl())
        url.search = app.createLoginUrl()
        window.newUrl = url
        app.checkLogin()
        return Promise.reject('You need to login again.')
    }
    if (error.response.status === 403) {
        const logoutUrl = app.provider().createLogoutUrl()
        const unauthorizedHtml = renderToStaticMarkup(unauthorizedJsx(logoutUrl))
        document.body.innerHTML = unauthorizedHtml
        // return Promise.reject('you are logged in, but you do not have access to this section')
        // todo: redirect user to "403" page.
    }
    if (error.response.status === 404) {
        return Promise.reject('404\nService does not exist')
    }
    if (error.response.status === 400 || error.response.status === 500) {
        var messages = ''
        var data = error.response.data
        if (data instanceof Blob) {
            if (data.type === "application/json") {
                data = JSON.parse(await data.text())
            }
            else if (data.type == "text/plain") {
                data = await data.text()
            }
            else {
                data = data.type
            }
        }
        if (typeof data !== "string") {
            if (data.stack) {
                return Promise.reject(
                    {
                        message: data.text,
                        description: <div>
                            {
                                data.stack.filter(i => i !== data.text).map(i => <div
                                    className="my-2"
                                >
                                    {i}
                                </div>)
                            }
                        </div>
                    }
                )
            }
            else {
                for (var entity in error.response.data) {
                    if (entity.toLocaseCase && entity.toLocaseCase() === 'type') {
                        continue
                    }
                    if (Array.isArray(data[entity])) {
                        for (var i = 0; i < data[entity].length; i++) {
                            messages += data[entity][i] + "\n"
                        }
                    }
                    else if (typeof data[entity] === 'object') {
                        console.log(data[entity])
                    }
                    else {
                        messages += data[entity] + "\n"
                    }
                }
            }
        }
        else {
            messages = data
        }
        if (messages.indexOf('IDX10223') > -1) {
            app.checkLogin()
            return Promise.reject('You need to login again.')
            //app.updateToken()
        }
        console.error(messages)
        return Promise.reject(messages)
    }
}

axiosApi.interceptors.request.use(requestInterceptor)

axiosApi.interceptors.response.use(response => response, errorInterceptor)

const get = async (url) => {
    return await
        axiosApi
            .get(url, {
                crossDomain: true
            })
            .then(response => {
                return response?.data
            })
            .catch(error => {
                throw error
            })
}

const post = async (url, data) => {
    return await axiosApi
        .post(url, Array.isArray(data) ? [...data] : { ...data })
        .then(response => response?.data)
        .catch(error => {
            throw error
        })
}

const form = async (url, data) => {
    return await axiosApi
        .post(url, new URLSearchParams(data))
        .then(response => response?.data)
        .catch(error => {
            throw error
        })
}

const upload = async (url, data) => {
    return await axiosApi
        .post(url, data, {
            ...requestConfig,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => response?.data)
        .catch(error => {
            throw error
        })
}

const download = async (url) => {
    return await
        axiosApi
            .get(url, {
                crossDomain: true,
                responseType: 'blob'
            })
            .then(response => new File([response?.data], 'File'))
            .catch(error => {
                throw error
            })
}

export { axios }
export { download }
export { errorInterceptor }
export { form }
export { get }
export { post }
export { requestInterceptor }
export { upload }
