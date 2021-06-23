import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMovieHAndler = useCallback(() => {
		setLoading(true);
		setError(null);
		fetch("https://swapi.dev/api/films")
			.then((res) => {
				if (!res.ok) {
					throw new Error(
						"Something went wrong. Please try again or check your internet connection"
					);
				}
				return res.json();
			})
			.then((data) => {
				const transformedData = data.results.map((result) => {
					return {
						id: result.episode_id,
						title: result.title,
						openingText: result.opening_crawl,
						releaseDate: result.release_date,
					};
				});
				console.log(data.results);
				setMovies(transformedData);
			})
			.catch((error) => {
				setError(error.message);
			});
		setLoading(false);
	}, []);

	useEffect(() => {
		fetchMovieHAndler();
	}, []);
	// fetchMovieHAndler can also be converted into async/await
	// while using fetchMovieHAndler in async/awit , we have to use try/catch block for the catch methods

	let content = <p>Found No Movies</p>;

	if (movies.length > 0) {
		content = <MoviesList movies={movies} />;
	}
	if (error) {
		content = <p>{error}</p>;
	}
	if (loading) {
		content = <p>Loading</p>;
	}

	return (
		<React.Fragment>
			<section>
				{/* <button onClick={fetchMovieHAndler}>Fetch Movies</button> */}

				<button>Fetch Movies</button>

				{loading && <p>Loading .... </p>}
			</section>

			<section>
				{/* {!loading && movies.length > 0 && <MoviesList movies={movies} />}
				{!loading && movies.length == 0 && <p>Found no movies yet</p>}
				{!loading && error && <p>{error}</p>} */}

				{content}
			</section>
		</React.Fragment>
	);
}

export default App;
