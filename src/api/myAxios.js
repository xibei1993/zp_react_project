import axios from 'axios'
import querystring from 'querystring'
import {message} from 'antd'
import {BASE_URL} from '../config'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

axios.defaults.baseURL = BASE_URL

axios.interceptors.request.use((config)=>{
    const {method,data} = config
    if(method === 'post' && data instanceof Object){
        config.data = querystring.stringify(data)
    }

    
    return config
})

axios.interceptors.response.use(

    (response)=>{
        NProgress.done()
        return response.data
    },
    (error)=>{
        NProgress.done()
        message.error('请求失败，快去请如来佛')
        return new Promise(()=>{})
    }

)

export default axios