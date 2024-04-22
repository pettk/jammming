import React, {useEffect, useState, useCallback} from "react";
import './App.css';
import axios from 'axios';
import Playlist from './playlist';
import Spotify from './spotify';

function App() {
  const CLIENT_ID = "6740175e7eb04c06817060f1d2b0d7fb"
  const REDIRECT_URI = "http://localhost:3000/"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("");
    const [searchKey, setSearchKey] = useState("");
    const [tracks, setTracks] = useState([]);
    const [playListNames, setPlayListNames] = useState([]);
    const [playListTracks, setPlayListTracks] = useState([]);

    // const getToken = () => {
    //     let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
    //     let token = urlParams.get('access_token');
    // }

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        // getToken()


        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)

    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    const searchTracks = async (e) => {
      e.preventDefault();
        const {data} = await axios.get(`https://api.spotify.com/v1/search` , {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: searchKey,
            type: "track"
          }
  
        });
        setTracks(data.tracks.items)

    };
    const renderTracks = () => {
        return tracks.map(track => (
            <div key={track.id}>
                {track.name} | {track.artists.length > 0 ? track.artists[0].name : 'Unknown Artist'}
                <button onClick={() => addTrack(track)}>+</button>
            </div>
            
        ))
    }
    
    function addTrack(track) {
      console.log(tracks);
      console.log(track);
      setPlayListTracks((prev) => [track, ...prev]);
    }
  
    function removeTrack(track) {
      setTracks((prevTrack) => prevTrack.filter((currentTrack) => currentTrack.id !== track.id));
    }

    // //set new one to not use Spotify
    // const savePlaylist = useCallback(() => {
    //   const trackUris = tracks.map((track) => track.uri);
    //   Spotify.savePlaylist(playListNames, trackUris).then(() => {
    //     setPlayListNames("New Playlist");
    //     setTracks([]);
    //   });
    // }, [playListNames, tracks]);

    const createPlayList = async (e) => {
      e.preventDefault();
      const {response} = await axios.post(`https//:api.spotify.com/v1/me/playlists`, 
        {
          name: playListNames,
          public: false
        },
        { headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": `application/json`
        },
      });
      setPlayListNames(response.name.items)
    };
  
    function updatePlaylistName(name) {
      setPlayListNames(name);
    }


    return (
        <div className="App">
            <header className="header">
              <h1>Jammming</h1>
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout}>Logout</button>}
            </header>
                {token ?
                <div>
                  <form onSubmit={searchTracks} className="searchbar">
                    <input type="text" placeholder='Enter a song name' onChange={e => setSearchKey(e.target.value)} />
                    <button type={"submit"} onSubmit={searchTracks}>Search</button>
                  </form>
                  <div className="App-playlist">
                    <div className="searhResult">
                      <h1>Search Results</h1>
                      {renderTracks()}
                    </div>
                  <div>
                    <Playlist 
                      playlistNames={playListNames}
                      tracks={tracks}
                      onNameChange={updatePlaylistName}
                      onRemove={removeTrack}
                      onSave={createPlayList}
                    />
                     {playListTracks.map((track, index) => (
                        <div key={index}>
                          {track.name} | {track.artists.length > 0 ? track.artists[0].name : 'Unknown Artist'}
                        </div>
                      ))}

                    </div>
                  </div>
              
                </div>                
                    : <h2>Please login</h2>
                }

                

  
        </div>
    );
}

export default App;