import axios from 'axios'


export const searchLastFM = (searchTerm) => {

        return get(`https://ws.audioscrobbler.com/2.0/?method=album.search&api_key=${config.LASTFM_APIKEY}&format=json&album=${searchTerm}`)
    
}

export const getAlbumInfo_LastFM = (artistName, albumName) => {

     return get(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${config.LASTFM_APIKEY}&artist=${artistName}&album=${albumName}&format=json`)
}

export const get = (url) => {
    return axios.get(url)
}