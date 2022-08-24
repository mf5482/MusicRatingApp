import axios from 'axios'

const LASTFM_APIKEY = '6f56338eb25d490758ed90b49abfcc8e'

export const searchLastFM = (searchTerm) => {

        return get(`https://ws.audioscrobbler.com/2.0/?method=album.search&api_key=${LASTFM_APIKEY}&format=json&album=${searchTerm}`)
    
}

export const getAlbumInfo_LastFM = (artistName, albumName) => {

     return get(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${LASTFM_APIKEY}&artist=${artistName}&album=${albumName}&format=json`)
}

export const get = (url) => {
    return axios.get(url)
}