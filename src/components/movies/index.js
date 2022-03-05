import React, { useEffect, useReducer } from "react";
import { connect } from "react-redux";
import BackIcon from "../../assets/Back.png";
import SearchMovie from "./searchMovie";
import { fetchMovieList, setMovieLoading } from "../../store/action";
import "./index.scss";

const initialState = {
    page: 1
}

const reducer = (state, action) => {
    return {...state, ...action}
}

const MovieListing = ({ movieListLoading, setMovieLoading, movieList, fetchMovieList, isSearchShown=false, searchMovie }) => {
    const [{page}, dispatch] = useReducer(reducer, initialState);

    const {content_items, page_size_requested, title, total_content_items} = movieList;

	const isBottom = el => {
		return el.getBoundingClientRect().bottom <= (window.innerHeight + 1);
	}

	useEffect(() => {
		const checkScrolling = () => {
			const wrapper = document.getElementById('diagnal-movies-device-body');
			if (isBottom(wrapper)) {
                if(page_size_requested * page < total_content_items) {
                    dispatch({page: page+1});
                }
                document.removeEventListener('scroll', checkScrolling);
			}
		};
		document.addEventListener('scroll', checkScrolling, true);
		return () => {
			document.removeEventListener('scroll', checkScrolling, true);
		}
	}, [page, page_size_requested, total_content_items]);

    useEffect(() => {
        fetchMovieList(page, e=>{
            if(e.page) {
                setMovieLoading(false);
            }
        });
    }, [page, fetchMovieList, setMovieLoading]);

    const onImageError = e => {
        const image = e.target;
        image.src = './images/placeholder_for_missing_posters.png';
    }

    const renderList = ({content}) => {
        const filterList = searchMovie !== '' ? content.filter(movie => {
            return movie.name.toLowerCase().search(searchMovie.toLowerCase()) > -1;
        }) : [...content];
        
        return filterList.length ? filterList.map((movie, index) => {
            const imagePath = `./images/${movie['poster-image']}`;
            return <div key={index} className="movie-list-item">
                <img src={imagePath} alt={movie['poster-image']} onError={onImageError} />
                <div>{movie.name}</div>
            </div>
        }) : movieListLoading ? <div className="list-loading">Loading...</div> : <div className="no-items-found">No items found...</div>;
    }

    return <>
        <header className={`diagnal-movies-header ${isSearchShown ? 'searching' : ''}`} data-testid="diagnal-movies-header">
            <button className="btn-back"><img src={BackIcon} alt="BackIcon" /></button>
            <div className="page-title">{title}</div>
            <SearchMovie />
        </header>
        <section className="diagnal-movies-body" data-testid="diagnal-movies-body">
            <div className="moview-listing-wrap">
                {content_items?.content.length ? renderList(content_items) : null}
            </div>
        </section>
    </>
}

const mapStateToProps = ({MovieReducer}) => {
    return {
        movieListLoading: MovieReducer?.movieListLoading,
        movieList: MovieReducer?.movieList,
        isSearchShown: MovieReducer?.isSearchShown,
        searchMovie: MovieReducer?.searchMovie,
    }
}

const mapDispatchToProps = {
    fetchMovieList,
    setMovieLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieListing);