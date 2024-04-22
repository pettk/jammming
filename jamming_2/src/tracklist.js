import React from "react";
import Track from "./track";

function TrackList(props) {
    return (
        <div>
            {props.tracks.map((track) => (
                <Track 
                    track={track}
                    key={track.id}
                    onAdd={props.onAdd}
                    isRemoval={props.isRemoval}
                    onRemove={props.onRemove}
                />
            ))}
        </div>
    );
}

export default TrackList;