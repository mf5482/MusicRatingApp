import * as SQLite from 'expo-sqlite';

var db

export const getDBConnection = async () => {

    db = SQLite.openDatabase('localStorage.db');
    return db
};

export const createTable = async () => {
  db.transaction(tx => {
    /*tx.executeSql('DROP TABLE Playlists'),
    tx.executeSql('DROP TABLE Albums'), */
    tx.executeSql('CREATE TABLE IF NOT EXISTS Playlists ("Name" TEXT, "DateCreated" TEXT, "LastEditDate" TEXT, "ID" INTEGER PRIMARY KEY)'),
    tx.executeSql('CREATE TABLE IF NOT EXISTS Albums ("master_id" INT, "title"	TEXT, "artist"	TEXT, "year"	INTEGER, "genre"	TEXT, "cover_image" TEXT, "rating" NUMERIC, "playlistId" INT, PRIMARY KEY("master_id"))'),
    tx.executeSql('INSERT OR IGNORE INTO Playlists (rowid, Name, DateCreated) VALUES (1,"Listen To", datetime("now", "localtime")), (2,"Relisten", datetime("now", "localtime")), (3,"Wishlist", datetime("now", "localtime")), (4,"Owned", datetime("now", "localtime")), (5,"Discard Pile", datetime("now", "localtime"))')
  })

}

export const getDB = async() => {
  return db
}

/*export const addAlbum = (album) => {
  db.transaction(tx => {
    tx.executeSql(`INSERT INTO Albums (Album, Artist, Year, Genre, Rating, PlaylistID, DateAdded) VALUES ("${album.albumName}", "${album.artist}", ${album.year}, "${album.genre}", ${album.rating}, "${album.playlistID}", "${new Date()}")`)
  })
} */

/*export const executeSQL = () => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM Albums', null, // passing sql query and parameters:null
      // success callback which sends two things Transaction object and ResultSet Object
      (txObj, { rows: { _array } }) => {
      },
      // failure callback which sends two things Transaction object and Error
      (txObj, error) => console.log('Error ', error)
      ) // end executeSQL
  }) // end transaction
}*/

export const getAlbums = (setAlbumsFunction, playlistId, rating, random, sortBy) => {
  return new Promise((resolve, reject) => {

    var query = `SELECT * FROM Albums WHERE ${playlistId !== undefined ? `playlistId = "${playlistId}"` : ''}${playlistId !== undefined && rating !== undefined ? ` AND ` : ''}
    ${rating !== undefined ? `rating = "${rating}"` : ''}${random === true ? 'ORDER BY RANDOM() Limit 10' : ''}${sortBy !== undefined && sortBy !== null ? `ORDER BY ${sortBy} ASC`:''}`

 
  db.transaction(tx => {
    tx.executeSql(query, null, // passing sql query and parameters:null
      // success callback which sends two things Transaction object and ResultSet Object
      (txObj, { rows: { _array } }) => {
        setAlbumsFunction(_array)
        return resolve()
      },
      // failure callback which sends two things Transaction object and Error
      (txObj, error) => {
        console.log('Error ', error)
        return resolve()
      }
      ) // end executeSQL
  }) // end transaction
})
}

export const getPlaylists = (setPlaylistFunction) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM Playlists', null, // passing sql query and parameters:null
      // success callback which sends two things Transaction object and ResultSet Object
      (txObj, { rows: { _array } }) => {
        setPlaylistFunction(_array)
        return
      },
      // failure callback which sends two things Transaction object and Error
      (txObj, error) => console.log('Error ', error)
      ) // end executeSQL
  })
}

export const addToPlaylist = (task, albumItem) => {

  return new Promise((resolve, reject) => {

    var x
    if(task === 'INSERT'){
      x = `INSERT INTO Albums (master_id, title, artist, year, cover_image, genre, playlistId, rating) VALUES (${albumItem.masterId}, '${albumItem.album.replace(/'/g,"''")}','${albumItem.artist.replace(/'/g,"''")}', ${albumItem.year}, "${albumItem.coverArt}", '${albumItem.genre.replace(/'/g,"''")}', ${albumItem.playlistId}, null)`
      //x = `INSERT INTO Albums (master_id, title, artist, year, cover_image, genre, playlistId, rating) VALUES (${albumItem.masterId}, '${albumItem.album.replaceAll("'", "''")}','${albumItem.artist.replaceAll("'", "''")}', ${albumItem.year}, "${albumItem.coverArt}", '${albumItem.genre.replaceAll("'", "''")}', ${albumItem.playlistId}, null)`
    }else if(task === 'UPDATE'){
      x = `UPDATE Albums SET playlistId = ${albumItem.playlistId} WHERE title = '${albumItem.album.replace(/'/g,"''")}' AND artist = '${albumItem.artist.replace(/'/g,"''")}'`
      //x = `UPDATE Albums SET playlistId = ${albumItem.playlistId} WHERE title = '${albumItem.album.replaceAll("'", "''")}' AND artist = '${albumItem.artist.replaceAll("'", "''")}'`
    }else{
      return reject()
    }


    db.transaction(tx => {
      tx.executeSql(queryPlaylist(task, albumItem), null, // passing sql query and parameters:null
        // success callback which sends two things Transaction object and ResultSet Object
        (txObj)=>{return resolve('Success')},
        // failure callback which sends two things Transaction object and Error
        (txObj, error) => {
          console.log('Error ', error)
          return resolve(error.toString())
          
        }
        )
    })
  })
}

export const getAlbumPlaylist = (masterId, idFunction, nameFunction) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`SELECT p.ID, p.Name FROM Albums pm INNER JOIN Playlists p ON pm.playlistId = p.ID WHERE pm.master_id = ${masterId}`, null,
      (txObj, {rows: {_array}}) => {
        if(_array.length != 0){
          idFunction(_array[0].ID)
          nameFunction(_array[0].Name)
          return resolve()
        }
      }, (txObj, error) => console.log('Error', error))
    })
  })
}

export const getPlaylistName= (playlistID, setName) => {

  if(playlistID === null){
    setName(null)
    return
  }

  db.transaction(tx => {
    tx.executeSql(`SELECT Name FROM Playlists WHERE ID = ${playlistID}`, null, // passing sql query and parameters:null
      // success callback which sends two things Transaction object and ResultSet Object
      (txObj, { rows: { _array } }) => {
        setName(_array[0]['Name'])
        return
      },
      // failure callback which sends two things Transaction object and Error
      (txObj, error) => console.log('Error ', error)
      ) // end executeSQL
  })
}

export const removeAlbum = (masterId) => {

  return new Promise((resolve, reject) => {

  db.transaction(tx => {
    tx.executeSql(`UPDATE Albums SET playlistId = null WHERE master_id = ${masterId}`, null, 
    (txObj) => {
    },
    // failure callback which sends two things Transaction object and Error
    (txObj, error) => {
      console.log('Error ', error)
      return reject()
    }
    ),
    tx.executeSql(`DELETE FROM Albums WHERE master_id = ${masterId} AND rating is null`, null, 

    (txObj) => {
      return resolve()
    },
    // failure callback which sends two things Transaction object and Error
    (txObj, error) => {
      console.log('Error ', error)
      return reject()
    }
    )

  })

})
}

export const getAlbumRating = (masterId, setAlbumRating) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`SELECT rating FROM Albums a WHERE a.master_id = ${masterId}`, null,
      (txObj, {rows: {_array}}) => {
        if(_array.length != 0){
          setAlbumRating(_array[0].rating)
          return resolve()
        }
      }, (txObj, error) => {
        console.log('Error', error)
        return reject()
      })
    })
  })
}

export const saveAlbumRating = (task, albumItem) => {
  return new Promise((resolve, reject) => {

    var x
    if(task === 'INSERT'){
      x = `INSERT INTO Albums (master_id, title, artist, year, cover_image, genre, playlistId, rating) VALUES (${albumItem.masterId}, '${albumItem.album.replace(/'/g,"''")}','${albumItem.artist.replace(/'/g,"''")}', ${albumItem.year}, '${albumItem.coverArt}', '${albumItem.genre.replace(/'/g,"''")}', null, ${albumItem.rating})`
      //x = `INSERT INTO Albums (master_id, title, artist, year, cover_image, genre, playlistId, rating) VALUES (${albumItem.masterId}, '${albumItem.album.replaceAll("'", "''")}','${albumItem.artist.replaceAll("'", "''")}', ${albumItem.year}, '${albumItem.coverArt}', '${albumItem.genre.replaceAll("'", "''")}', null, ${albumItem.rating})`
    }else if(task === 'UPDATE'){
      x = `UPDATE Albums SET rating = ${albumItem.rating} WHERE master_id = ${albumItem.masterId}`
    }else{
      return reject()
    }

    db.transaction(tx => {
      tx.executeSql(queryRating(task, albumItem), null, // passing sql query and parameters:null
        // success callback which sends two things Transaction object and ResultSet Object
        (txObj)=>{return resolve('Success')},
        // failure callback which sends two things Transaction object and Error
        (txObj, error) => {
          console.log('Error ', error)
          return resolve(error.toString())  
        
        }
        )
    })
  })
}

export const removeAlbumRating = (masterId) => {
return new Promise((resolve, reject) => {
  db.transaction(tx => {
    tx.executeSql(`UPDATE Albums SET rating = null WHERE master_id = ${masterId}`, null, 
    (txObj) => {
    },
    // failure callback which sends two things Transaction object and Error
    (txObj, error) => {
      console.log('Error ', error)
      return reject()
    }
    ),
    tx.executeSql(`DELETE FROM Albums WHERE master_id = ${masterId} AND playlistId is null`, null, 

    (txObj) => {
      return resolve()
    },
    // failure callback which sends two things Transaction object and Error
    (txObj, error) => {
      console.log('Error ', error)
      return reject()
    }
    )

  })
})
}

const queryRating = (task, albumItem) => {
 
  if(task === 'UPDATE'){
    return `UPDATE Albums SET rating = ${albumItem.rating} WHERE master_id = ${albumItem.masterId}`
  }else if(task === 'INSERT'){
    return `INSERT INTO Albums (master_id, title, artist, year, cover_image, genre, playlistId, rating) VALUES (${albumItem.masterId}, '${albumItem.album.replace(/'/g,"''")}','${albumItem.artist.replace(/'/g,"''")}', ${albumItem.year}, '${albumItem.coverArt}', '${albumItem.genre.replace(/'/g,"''")}', null, ${albumItem.rating})`
    //return `INSERT INTO Albums (master_id, title, artist, year, cover_image, genre, playlistId, rating) VALUES (${albumItem.masterId}, '${albumItem.album.replaceAll("'", "''")}','${albumItem.artist.replaceAll("'", "''")}', ${albumItem.year}, '${albumItem.coverArt}', '${albumItem.genre.replaceAll("'", "''")}', null, ${albumItem.rating})`
  }else{
    return null
  }
}

const queryPlaylist = (task, albumItem) => {

  if(task === 'UPDATE'){
    return `UPDATE Albums SET playlistId = ${albumItem.playlistId} WHERE master_id = ${albumItem.masterId}`
  }else if(task === 'INSERT'){
    return `INSERT INTO albums (master_id, title, artist, year, cover_image, genre, playlistId, rating) VALUES (${albumItem.masterId}, '${albumItem.album.replace(/'/g,"''")}','${albumItem.artist.replace(/'/g,"''")}', ${albumItem.year}, '${albumItem.coverArt}', '${albumItem.genre.replace(/'/g,"''")}', ${albumItem.playlistId}, null)`
    //return `INSERT INTO albums (master_id, title, artist, year, cover_image, genre, playlistId, rating) VALUES (${albumItem.masterId}, '${albumItem.album.replaceAll("'", "''")}','${albumItem.artist.replaceAll("'", "''")}', ${albumItem.year}, '${albumItem.coverArt}', '${albumItem.genre.replaceAll("'", "''")}', ${albumItem.playlistId}, null)`
  }else{
    return null
  }
}

export const getRatingsList = (setList) => {

  var ratingsArray = []

  for(let i = 0; i<= 5; i+=0.5){
    ratingsArray.push({
      "ID" : i.toString(),
      "Name" : `${i.toString()} Star${i !== 1 ? 's' : ''}`
    })
  }

  return setList(ratingsArray)
  
}