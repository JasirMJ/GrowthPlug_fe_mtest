const protocol = 'https://'
//const protocol = 'http://'

const domain = `jsonplaceholder.typicode.com`
// const domain = `reqres.in`

export const token = localStorage.getItem('fb_token') ? localStorage.getItem('fb_token') : ""

const url = `${protocol}${domain}`

export default url

export const defaulturl = "http://localhost:8000/"
