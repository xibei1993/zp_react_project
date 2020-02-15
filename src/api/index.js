import myAxios from './myAxios'

export const reqLogin = (username,password)=> myAxios.post('/logon',{username,password})
