import React, {useState, useCallback} from 'react';


function SearchBar(props) {
    const [input, setInput] = useState('');

    function handleChange(event) {
        setInput(event.target.value);
    }

    function handleClick() {
        props.onSearch(input);
    }
    
    return (
        <div>
            <input type="text" placeholder='Enter a song name' onChange={handleChange} />
            <button onClick={handleClick}>SEARCH</button>
        </div>

    );
};

export default SearchBar;