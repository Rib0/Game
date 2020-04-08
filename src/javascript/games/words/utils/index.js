export const request = (url, config = {}) => {
    return fetch(url, config)
        .then(resp => resp.json())
        .catch(console.log);
};
