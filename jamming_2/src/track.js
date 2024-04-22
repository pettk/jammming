import React from "react";

function Track(props) {
    function addTrack(event) {
        props.onAdd(props.track);
    }

    function removeTrack(event) {
        props.onRemove(props.track)
    }

    function renderAction() {
        if(props.isRemoval) {
            return (
                <button onClick={removeTrack}>-</button>
            );
        } else {
            return (
                <button onClick={addTrack}>+</button>
            );
        }
    }

    return (
        <div>
            <h3>{props.track.name}</h3>
            <p>{props.track.artists.name}</p>
            {renderAction()}
        </div>
    );

}

export default Track;