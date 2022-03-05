import './App.scss';

import MovieListing from "./components/movies";

const App = () => {		   
	return (
		<div className="diagnal-movies-device-wrap" data-testid="diagnal-movies-device-wrap">
			<section className="diagnal-movies-device-body" id="diagnal-movies-device-body">
				<div className="diagnal-movies-wrap">
					<MovieListing />
				</div>
			</section>
		</div>
  	);
}

export default App;
