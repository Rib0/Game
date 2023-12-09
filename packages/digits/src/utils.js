export const getRandom = (min, max) =>
    Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + min;