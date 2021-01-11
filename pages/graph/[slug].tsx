import { withApollo } from "../../apollo/client";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { MovieByIdDocument } from "../../generated/graphql";
import React from "react";
import Head from "next/head";
import Layout from "../../components/layout";
import styled from "styled-components";

const IconList = styled.ul`
	list-style-type: none;
`;
const Icon = styled.li`
	display: inline;
	margin: 0 4px;
`;
const ProviderType = styled.p`
	line-height: 1.2em;
	border-top: 1px #172a3b groove;
	color: #172a3b;
`;

const MovieDetail = () => {
	const router = useRouter();
	const { slug } = router.query;
	const { loading, error, data = {} } = useQuery(MovieByIdDocument, {
		variables: { id: slug },
	});
	const { movieById = null } = data;

	return (
		<Layout>
			<Head>
				<title>Learn more about a moive and find out where to stream</title>
			</Head>

			{error && (
				<div>
					{error.message}
					{error.graphQLErrors.map((v) => v.message)}
					{error.extraInfo}
				</div>
			)}
			{movieById && (
				<div>
					{/* <MoviesList movies={data.nowPlaying.movieList} className={null} /> */}
					<img src={movieById.poster} alt="poster" />
					<p>Title: {movieById.title}</p>
					<p>Overview: {movieById.overview}</p>
					<p>Genres: {movieById.genres}</p>
					<p>Rlease date: {movieById.releaseDate}</p>
					<p>Vote average: {movieById.voteAverage}</p>
					<p>Vote count: {movieById.voteCount}</p>
					<p>Watch providers: </p>
					{movieById.watchProviders.map((x) => (
						<>
							<ProviderType>{x.type}</ProviderType>
							<IconList>
								{/* {" "} */}
								{!x.providers.length && "None"}
								{x.providers.map((y) => (
									<Icon>
										<img
											src={y.logoURL}
											width={50}
											alt={y.name}
											title={y.name}
										/>
									</Icon>
								))}
								{/* {" "} */}
							</IconList>
						</>
					))}
				</div>
			)}
			{loading && <div>Loading...</div>}
			{/* <hr /> */}
			{/* <span onClick={() => router.back()}>Click here to go back</span> */}
		</Layout>
	);
};

export default withApollo(MovieDetail);
