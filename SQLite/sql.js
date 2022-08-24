import * as SQLite from 'expo-sqlite';

var db

export const getDBConnection = async () => {

    db = SQLite.openDatabase('localStorage.db');
    return db
};

export const createTable = async () => {
  db.transaction(tx => {
    /*tx.executeSql('DROP TABLE Playlists'),
    tx.executeSql('DROP TABLE Albums'),*/
    tx.executeSql('CREATE TABLE IF NOT EXISTS Playlists ("Name" TEXT, "DateCreated" TEXT, "LastEditDate" TEXT, "ID" INTEGER PRIMARY KEY)'),
    tx.executeSql('CREATE TABLE IF NOT EXISTS Albums ("MasterId" INT, "Album"	TEXT, "Artist"	TEXT, "Year"	INTEGER, "Genre"	TEXT, "CoverArt" TEXT, "Rating" NUMERIC, "PlaylistId" INT, PRIMARY KEY("MasterId"))'),
    tx.executeSql('INSERT OR IGNORE INTO Playlists (rowid, Name, DateCreated) VALUES (1,"Listen To", datetime("now", "localtime")), (2,"Wishlist", datetime("now", "localtime")), (3,"Owned", datetime("now", "localtime")), (4,"Discard Pile", datetime("now", "localtime"))')
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

export const executeSQL = () => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM Albums', null, // passing sql query and parameters:null
      // success callback which sends two things Transaction object and ResultSet Object
      (txObj, { rows: { _array } }) => {
        console.log(_array)
      },
      // failure callback which sends two things Transaction object and Error
      (txObj, error) => console.log('Error ', error)
      ) // end executeSQL
  }) // end transaction
}

export const getAlbums = (setAlbumsFunction) => {
  return new Promise((resolve, reject) => {

 
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM Albums WHERE PlaylistId = "1" ORDER BY RANDOM() Limit 10', null, // passing sql query and parameters:null
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
      x = `INSERT INTO Albums (MasterId, Album, Artist, Year, CoverArt, Genre, PlaylistId) VALUES (${albumItem.masterId}, '${albumItem.album.replaceAll("'", "''")}','${albumItem.artist.replaceAll("'", "''")}', ${albumItem.year}, "${albumItem.coverArt}", '${albumItem.genre.replaceAll("'", "''")}', ${albumItem.playlistId})`
    }else if(task === 'UPDATE'){
      x = `UPDATE Albums SET PlaylistId = ${albumItem.playlistId} WHERE Album = '${albumItem.album.replaceAll("'", "''")}' AND Artist = '${albumItem.artist.replaceAll("'", "''")}'`
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
      tx.executeSql(`SELECT p.ID, p.Name FROM Albums pm INNER JOIN Playlists p ON pm.PlaylistId = p.ID WHERE pm.MasterId = ${masterId}`, null,
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
    tx.executeSql(`UPDATE Albums SET PlaylistId = null WHERE MasterId = ${masterId}`, null, 
    (txObj) => {
    },
    // failure callback which sends two things Transaction object and Error
    (txObj, error) => {
      console.log('Error ', error)
      return reject()
    }
    ),
    tx.executeSql(`DELETE FROM Albums WHERE MasterId = ${masterId} AND Rating is null`, null, 

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
      tx.executeSql(`SELECT Rating FROM Albums a WHERE a.MasterId = ${masterId}`, null,
      (txObj, {rows: {_array}}) => {
        if(_array.length != 0){
          setAlbumRating(_array[0].Rating)
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

    console.log('Here')
    var x
    if(task === 'INSERT'){
      x = `INSERT INTO Albums (MasterId, Album, Artist, Year, CoverArt, Genre, Rating) VALUES (${albumItem.masterId}, '${albumItem.album.replaceAll("'", "''")}','${albumItem.artist.replaceAll("'", "''")}', ${albumItem.year}, '${albumItem.coverArt}', '${albumItem.genre.replaceAll("'", "''")}', ${albumItem.rating})`
    }else if(task === 'UPDATE'){
      x = `UPDATE Albums SET Rating = ${albumItem.rating} WHERE MasterId = ${albumItem.masterId}`
    }else{
      return reject()
    }

    console.log('HERE')
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
    tx.executeSql(`UPDATE Albums SET Rating = null WHERE MasterId = ${masterId}`, null, 
    (txObj) => {
    },
    // failure callback which sends two things Transaction object and Error
    (txObj, error) => {
      console.log('Error ', error)
      return reject()
    }
    ),
    tx.executeSql(`DELETE FROM Albums WHERE MasterId = ${masterId} AND PlaylistId is null`, null, 

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
    return `UPDATE Albums SET Rating = ${albumItem.rating} WHERE MasterId = ${albumItem.masterId}`
  }else if(task === 'INSERT'){
    return `INSERT INTO Albums (MasterId, Album, Artist, Year, CoverArt, Genre, Rating) VALUES (${albumItem.masterId}, '${albumItem.album.replaceAll("'", "''")}','${albumItem.artist.replaceAll("'", "''")}', ${albumItem.year}, '${albumItem.coverArt}', '${albumItem.genre.replaceAll("'", "''")}', ${albumItem.rating})`
  }else{
    return null
  }
}

const queryPlaylist = (task, albumItem) => {

  if(task === 'UPDATE'){
    return `UPDATE Albums SET PlaylistId = ${albumItem.playlistId} WHERE MasterId = ${albumItem.masterId}`
  }else if(task === 'INSERT'){
    return `INSERT INTO Albums (MasterId, Album, Artist, Year, CoverArt, Genre, PlaylistId) VALUES (${albumItem.masterId}, '${albumItem.album.replaceAll("'", "''")}','${albumItem.artist.replaceAll("'", "''")}', ${albumItem.year}, '${albumItem.coverArt}', '${albumItem.genre.replaceAll("'", "''")}', ${albumItem.playlistId})`
  }else{
    return null
  }
}