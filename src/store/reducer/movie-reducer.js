import { MOVIES } from "../types";

const initialState = {
    movieList: { 
        content_items: {
            content: []
        }, 
        page_num_requested: 0, 
        page_size_requested: 0, 
        page_size_returned: 0, 
        title: '', 
        total_content_items: 0
    },
    searchMovie: '',
    isSearchShown: false,
    movieListLoading: true
}

export const MovieReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
        case MOVIES.MOVIE_LISTING:
            const { page } = action.payload;
            const newMovieList = state.movieList.page_num_requested !== page.page_num_requested ? 
            [...state.movieList.content_items.content, ...page['content-items']['content']] :
            [...page['content-items']['content']];
            return {
                ...state,
                movieList: { 
                    content_items: {
                        content: [...newMovieList]
                    }, 
                    page_num_requested: page['page-num-requested'], 
                    page_size_requested: page['page-size-requested'], 
                    page_size_returned: page['page-size-returned'], 
                    title: page.title, 
                    total_content_items: page['total-content-items']
                }
            }
        case MOVIES.SEARCH_MOVIE:
            return {
                ...state,
                searchMovie: action.payload
            }
        case MOVIES.IS_SEARCH_SHOWN:
            return {
                ...state,
                isSearchShown: action.payload
            } 
        case MOVIES.MOVIE_LIST_LOADING:
            return {
                ...state,
                movieListLoading: action.payload
            }                     
        default:
            return state;
    }
};
