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
        })
    })
        .then((response) => response.json())
        .catch((error) => console.error(error));
}

export function getLastGames (token) {
    const url = API_URL + '/api/last_games';
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

export function getNextGames (token) {
    const url = API_URL + '/api/next_games';
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

export function getCurrentGames (token) {
    const url = API_URL + '/api/current_games';
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

export function getLeagues (token) {
    const url = API_URL + '/api/leagues';
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

export function getLeaguesDetail (id, token) {
    const url = API_URL + '/api/leagues/' + id;
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

export function getLeaguesGames (league_id, round, token) {
    const url = API_URL + '/api/leagues/' + league_id + '/games?round=' + round;
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

export function addScore (game_id, scoreHome, scoreAway, token) {
    const url = API_URL + '/api/game_suggests';
    return fetch(url , {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
            game: '/api/games/' + game_id,
            scoreHomeTeam: scoreHome,
            scoreAwayTeam: scoreAway
        })
    })
        .then((response) => response.json())
        .catch((error) => console.error(error));
}

export function getBestScore (game_id, token) {
    const url = API_URL + '/api/suggest/' + game_id;
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

export function getLastScoreByUser (game_id, token) {
    const url = API_URL + '/api/lastsuggestbygame/' + game_id;
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

export function getUser (token) {
    const url = API_URL + '/api/me';
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