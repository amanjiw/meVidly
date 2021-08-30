import httpService from "./httpService";
import { apiUrl } from "../config.json";

const userApiEndpoint = `${apiUrl}/users`



 export const regeisterUser = function (user) {

    return httpService.post(userApiEndpoint, {

        email: user.username,
        password: user.password,
        name: user.name
    })

}