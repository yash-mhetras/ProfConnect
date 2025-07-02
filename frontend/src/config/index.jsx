const { default: axios } = require("axios")

export const BASEURL="http://localhost:9000";
export const clientserver=axios.create({
    baseURL:BASEURL
})