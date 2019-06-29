const API_URL = 'https://api.news.lmdfoot.com';

export function getNews () {
    const url = API_URL + '/articles?_sort=date:DESC&status=Published';
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error));
}

export function getNewsDetail (id) {
    const url = API_URL + '/articles/' + id;
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error));
}

export function getImageFromApi (name) {
    return API_URL + name;
}

