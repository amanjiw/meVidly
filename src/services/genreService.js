import httpService from "./httpService";
import { apiUrl } from "../config.json"
const genresApi = `${apiUrl}/genres`
export const getGenres = async function () {

    return httpService.get(genresApi)

}