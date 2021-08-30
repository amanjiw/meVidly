import httpService from "./httpService";
import { apiUrl } from "../config.json"
import jwtDecode from "jwt-decode";

const authApiEndPoint = `${apiUrl}/auth`;
const tokenKey = "jwt"




export const loginUser = async function (user) {

    const { data } = await httpService.post(authApiEndPoint, {
        email: user.username,
        password: user.password
    })

    localStorage.setItem(tokenKey, data)

}



export const logOut = function () {
    localStorage.removeItem(tokenKey);
}


export const getCurrentUser = function () {
    try {
        const jwt = localStorage.getItem(tokenKey);
        httpService.setJwt(jwt);
        return jwtDecode(jwt);

    } catch (error) {

    }
}


export const loginWithJwt = function (jwt) {
    localStorage.setItem(tokenKey, jwt)
}