import React from "react";
import { connect } from "react-redux";
import SearchIcon from "../../assets/search.png";
import { handleSearchMovie, setShowSearch } from "../../store/action";

import "./searchMovie.scss";

const SearchMovie = ({searchMovie, handleSearchMovie, isSearchShown, setShowSearch}) => {
    const handleCloseEvent = () => {
        handleSearchMovie('');
        setShowSearch(false);
    }

    return <div className="search-wrap">
        {isSearchShown ? 
            <div className="search-container">
                <input type="text" tabIndex={1} value={searchMovie} onChange={e=>handleSearchMovie(e.target.value)} />
                <div className="button-close" onClick={handleCloseEvent}><span className="icon-close">+</span></div>
            </div> : 
            <button tabIndex={2} className="btn-search" onClick={()=>setShowSearch(true)}><img src={SearchIcon} alt="SearchIcon" /></button>}
    </div>
}

const mapStateToProps = ({MovieReducer}) => {
    return {
        searchMovie: MovieReducer?.searchMovie,
        isSearchShown: MovieReducer?.isSearchShown
    }
}

const mapDispatchToProps = {
    handleSearchMovie,
    setShowSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchMovie);