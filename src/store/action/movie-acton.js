import { MOVIES } from "../types";
import { fetchHandler } from "../fetchHandler";

export const fetchMovieList = (page, successHandler, errorHandler) => {
    const fetchOptions = {
        url:`./api/CONTENTLISTINGPAGE-PAGE${page}.json`,
        method: "GET",
        actionType: MOVIES.MOVIE_LISTING
    };
    return fetchHandler(fetchOptions, successHandler, errorHandler);
}

export const handleSearchMovie = (payload) => {
    return {
        type: MOVIES.SEARCH_MOVIE,
        payload
    };
}

export const setShowSearch = (payload) => {
    return {
        type: MOVIES.IS_SEARCH_SHOWN,
        payload
    };
}

export const setMovieLoading = (payload) => {
    return {
        type: MOVIES.MOVIE_LIST_LOADING,
        payload
    };
}