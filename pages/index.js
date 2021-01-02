import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { withApollo } from "../apollo/client";

import Search from "../components/search";
import ListPage from './graph/ListPage';
import Pagination from 'react-js-pagination'

const QUERY = gql`
	query nowPlayingQuery($page: Int) {
		nowPlaying(page: $page) {
			id
			title
			overview
		}
	}
`;

const Index = () => {
	const Router = useRouter();
	const { searchParam } = Router.query;
	const [term, setTerm] = useState(searchParam);
	const gqlres = useQuery(QUERY, { variables: { page: 1 } });
	console.log("***from useQuery", gqlres);
	const { loading, error, data, refetch } = gqlres;

	useEffect(() => {
		refetch();
		term && Router.push("/", { query: { s: term } });
	}, [term]);

	const handlePageClick = () => {};

	return (
		<div>
			{error && <div>{error}</div>}
			{data && (
				<ul>
					{data.nowPlaying.map((v) => (
						<li>
							{v.title} {v.overview}
						</li>
					))}
				</ul>
			)}
			{loading && <div>Loading...</div>}
			<Pagination
				totalItemsCount={100}
				activePage={1}
				onPageChange={handlePageClick}
			/>
		</div>
	);
};

export default withApollo(Index);
