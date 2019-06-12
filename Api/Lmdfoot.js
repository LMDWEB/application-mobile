import config from '../config'

const API_TOKEN = '';
const API_URL = 'https://api.lmdfoot.com';

export function login (login, password) {
    const url = API_URL + '/login_check';
    return fetch(url , {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: login,
            password: password,
        }),
    })
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getMatch (id, token) {
    const url = API_URL + '/api/games/' + id;
    return fetch(url , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then((response) => response.json())
        .catch((error) => console.error(error));
}

export function addCommentary (text, game_id, token) {
    const url = API_URL + '/api/comments';
    return fetch(url , {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
            content: text,
            game: '/api/games/' + game_id,
        }),
    })
        .then((response) => response.json())
        .catch((error) => console.error(error));
}
