import React from 'react';
import TrackList from './tracklist';

function PlayList(props) {

    function handleNamechange(event) {
        props.onNameChange(event.target.value);
    }

    return (
        <div>
            <h1>Playlist</h1>
            <form>
                <input onChange={handleNamechange} defaultValue="New Playlist"/>
                <button value="submit" type="submit" onClick={props.onSave}>Create</button>

            </form>
        </div>
    );
};

export default PlayList;