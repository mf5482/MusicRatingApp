import axios from 'axios'

export const searchAlbum_Discogs = (artist, albumName) => {

    return get(`https://api.discogs.com/database/search?token=${config.DISCOGS_APIKEY}&query=${artist + ' ' + albumName}`)
   
}

export const getAlbum_Discogs = (masterId) => {
    return get(`https://api.discogs.com/masters/${masterId}?token=${config.DISCOGS_APIKEY}`)
}

export const get = (url) => {
    return axios.get(url)
}

export const searchDiscogs = (searchTerm) => {

    return get(`https://api.discogs.com/database/search?token=${config.DISCOGS_APIKEY}&type=master&query=${searchTerm}`)

}
