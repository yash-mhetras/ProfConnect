const { default: axios } = require("axios")

export const BASEURL="https://profconnectbackend.onrender.com";
export const clientserver=axios.create({
    baseURL:BASEURL
})