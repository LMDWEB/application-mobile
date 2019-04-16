import config from '../config'

const API_TOKEN = config.api_key_tmdb;
const API_URL = '';

// Matchs

export function getMatchs (filter) {
    const url = API_URL + '/movie/' + filter + '?api_key=' + API_TOKEN + '&language=fr&region=fr';
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}