import Head from "next/head";
import "../styles.css";
import React, { useEffect, useRef } from "react";
import { MOVIE_URL } from "../constants";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
	useEffect(() => {
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);
	const initProps = useRef(pageProps);
	return (
		<>
			<title>
				Movies: what's playing, what's trending and where to stream!
			</title>

			<Head>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff" />
			</Head>

			<Component {...initProps.current} />
		</>
	);
}

MyApp.getInitialProps = async (ctx) => {
	let topTrending = [];
	const data = await fetch(
		`${MOVIE_URL}/movie/now_playing?api_key=${process.env.TMDB_API_KEY}`
	).then((response) => response.json());
	if (data) {
		const result = data.results?.slice(0, 10);
		topTrending = result?.map((v) => ({
			id: v.id,
			overview: v.overview,
			title: v.title,
			backdrop: v.backdrop_path,
		}));
	}

	let genres = {};
	const genreData = await fetch(
		`${MOVIE_URL}/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`
	)
		.then((response) => response.json())
		.catch((e) => console.log("***genres api", e));
	if (genreData && genreData.genres) {
		genreData.genres.forEach((v) => {
			genres[v.id.toString()] = v.name;
		});
	} else {
		console.log("***Error getting genres!");
	}
	return { pageProps: { topTrending, genres } };
};
