import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { withApollo } from "../../apollo/client";
import Pagination from "react-js-pagination";
import Search from "../../components/search";
import MoviesList from '../../components/moviesList';

const QUERY = gql`
	query($keyword: String, $page: Int) {
		movieByKeyword(keyword: $keyword, page: $page) {
			movieList {
				id
				title
				backdrop
				overview
			}
			totalPages
			totalResults
		}
	}
`;
const SearchPage = () => {
	// const Router = useRouter();
	// const { searchParam } = Router.query;
	// const [term, setTerm] = useState(searchParam);
	const [activePage, setPage] = useState(1);
	const [keyword, setKeyword] = useState("");
	const gqlres = useQuery(QUERY, {
		variables: { keyword, page: activePage },
	});
	console.log("***from useQuery", gqlres);
	let { loading, error, data, refetch } = gqlres;
	if (!keyword) {
		loading = false;
		error = null;
		data = null;
	}
	const handlePageClick = (page) => {
		setPage(page);
		refetch({ page: activePage });
	};

	const doSearch = (phrase) => {
		setPage(1);
		setKeyword(phrase);
		console.log("***INSIDE doSearch", phrase);
		refetch({ variables: { keyword, page: activePage } });
	};

	return (
		<div>
			<Search className={null} onSubmitSearch={doSearch} value={null} />
			<hr
				style={{
					height: "2px",
					borderWidth: 0,
					color: "gray",
					backgroundColor: "gray",
				}}
			/>
			{error && <div>{error}</div>}
			{data && (
				<div>
					<p>
						Total results: {data.movieByKeyword.totalResults}, total pages:{" "}
						{data.movieByKeyword.totalPages}
					</p>
					{/* <p>
						Date range: {data.nowPlaying.minDate} to {data.nowPlaying.maxDate}
					</p> */}
					<MoviesList movies={data.movieByKeyword.movieList} className={null} />
					<Pagination
						totalItemsCount={data.movieByKeyword.totalResults}
						activePage={activePage}
						onChange={handlePageClick}
					/>
				</div>
			)}
			{loading && <div>Loading...</div>}
		</div>
	);
};

export default withApollo(SearchPage);
