import { render, screen } from '@testing-library/react';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import MovieListing from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
	MovieReducer: {
		movieList: {			
			page: {
				"title": "Romantic Comedy",
				"total-content-items" : "54",
				"page-num-requested" : "1",
				"page-size-requested" : "20",
				"page-size-returned" : "20",
				"content-items": {
				"content": [
					{
					"name": "The Birds",
					"poster-image": "poster1.jpg"
					},
					{
					"name": "Rear Window",
					"poster-image": "poster2.jpg"
					},
					{
					"name": "Family Pot",
					"poster-image": "poster3.jpg"
					}
				]
				}
			}
		}
	}
});

test('MovieListing component', () => {
    render(<Provider store={store}><MovieListing /></Provider>);
    const header = screen.getByTestId('diagnal-movies-header');
    expect(header).toBeInTheDocument();

    const body = screen.getByTestId('diagnal-movies-body');
    expect(body).toBeInTheDocument();
});
