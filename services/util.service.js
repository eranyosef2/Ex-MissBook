export const utilService = {
    makeId,
    makeLorem,
    getRandomInt,
    saveToStorage,
    loadFromStorage,
    getRandomBookPrice,
    getTruthyValues
}

function makeId(length = 25) {
    var genId = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        genId += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return genId;
}

function makeLorem(size = 100) {
    var genLorem = '';
    var possible = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    while (size > 0) {
        size--;
        genLorem += possible[Math.floor(Math.random() * possible.length)] + ' ';
    }
    return genLorem;
}

// Define getRandomInt() - (max is exclusive, min is inclusive)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomBookPrice(min, max) {
    min = Math.ceil(min * 100)
    max = Math.floor(max * 100)
    return Math.floor(Math.random() * (max - min) + min) / 100
}

export function getTruthyValues(obj) {
    const newObj = {}
    for (const key in obj) {
        const value = obj[key]
        if (value || value === 0) {
            newObj[key] = value
        }
    }
    return newObj

}


function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}