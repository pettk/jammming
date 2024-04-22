import React from 'react';
import TrackList from './tracklist';
function SearchResults(props) {


    return (
        <div>
            <h1>Search Results</h1>
            <TrackList tracks={props.searchResult} onAdd={props.onAdd} />
        </div>
    );
};

export default SearchResults;