import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { withApollo } from "../../apollo/client";
import Pagination from "react-js-pagination";
import Search from "../../components/search";
import MoviesList from "../../components/MoviesList";

const QUERY = gql`
	query nowPlayingQuery($page: Int) {
		nowPlaying(page: $page) {
			movieList {
				id
				title
				overview
				backdrop
			}
			minDate
			maxDate
			totalPages
			totalResults
		}
	}
`;

const Index = () => {
	// const Router = useRouter();
	// const { searchParam } = Router.query;
	// const [term, setTerm] = useState(searchParam);
	const [activePage, setPage] = useState(1);
	const gqlres = useQuery(QUERY, { variables: { page: activePage } });
	console.log("***from useQuery", gqlres);
	const { loading, error, data, refetch } = gqlres;

	// useEffect(() => {
	// 	refetch();
	// 	term && Router.push("/", { query: { s: term } });
	// }, [term]);

	const handlePageClick = (page) => {
		setPage(page);
		refetch({ page: activePage });
	};

	return (
		<div>
			{error && <div>{error}</div>}
			{data && (
				<div>
					<p>
						Total results: {data.nowPlaying.totalResults}, total pages:{" "}
						{data.nowPlaying.totalPages}
					</p>
					<p>
						Date range: {data.nowPlaying.minDate} to {data.nowPlaying.maxDate}
					</p>
					<MoviesList movies={data.nowPlaying.movieList} className={null} />

					<Pagination
						totalItemsCount={data.nowPlaying.totalResults}
						activePage={activePage}
						onChange={handlePageClick}
					/>
				</div>
			)}
			{loading && <div>Loading...</div>}
		</div>
	);
};

export default withApollo(Index);
