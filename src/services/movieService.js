import httpService from "./httpService";
import { apiUrl } from "../config.json"
const moviesApi = `${apiUrl}/movies`



export const getMovies = async function () {
    return httpService.get(moviesApi)
}

export const getMovie = async function (movieId) {


    return httpService.get(`${moviesApi}/${movieId}`)

}

export function saveMovie(movie) {
    console.log("this is movie",movie)
    if (movie._id) {
        const body = { ...movie };
        delete body._id;
        return httpService.put(moviesApi + "/" + movie._id, body);
    }

    return httpService.post(moviesApi, movie);
}



export const deleteMovie = function (movieId) {
    return httpService.delete(`${moviesApi}/${movieId}`)
}