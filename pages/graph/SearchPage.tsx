import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useQuery } from "@apollo/react-hooks";
import { withApollo } from "../../apollo/client";
import { MovieByTitleDocument } from "../../generated/graphql";
import MoviesList from "../../components/moviesList";
import Layout, { appCache } from "../../components/layout";
import { NextPage } from "next";
import Head from "next/head";

interface Props {
	genres?: Record<string, string>;
}
// const useStyles = makeStyles((theme: Theme) =>
// 	createStyles({
// 		textField: {
// 			marginLeft: theme.spacing(1),
// 			marginRight: theme.spacing(1),
// 		},
// 	})
// );

const SearchPage: NextPage<Props> = ({ genres }) => {
	// const classes = useStyles();
	const [activePage, setPage] = useState(1);
	const [phrase, setPhrase] = useState(appCache.searchPhrase);
	const gqlres = useQuery(MovieByTitleDocument, {
		variables: { title: phrase, page: activePage },
	});
	let { loading, error, data, refetch } = gqlres;
	if (!phrase) {
		loading = false;
		error = null;
		data = null;
	}
	const handlePageClick = (e) => {
		const page = parseInt(e.target.innerText);
		setPage(page);
		refetch({ page: page });
	};

	const doSearch = (e) => {
		e.preventDefault();
		const phrase = e.target[0].value;
		appCache.searchPhrase = phrase;
		setPage(1);
		setPhrase(phrase);
		refetch({ title: phrase, page: activePage });
	};

	return (
		<Layout>
			<Head>
				<title>
					Search movies by title/keywords and find out where to stream!
				</title>
			</Head>

			<form noValidate autoComplete="off" onSubmit={doSearch}>
				<TextField
					// className={classes.textField}
					label="Search movie title"
					variant="outlined"
					margin="normal"
					fullWidth
					InputLabelProps={{
						shrink: true,
					}}
					defaultValue={appCache.searchPhrase}
				/>
			</form>
			<hr />
			<div>
				{error && <div>{error}</div>}
				{data && (
					<div>
						<p>
							Total results: {data.movieByTitle.totalResults}, total pages:{" "}
							{data.movieByTitle.totalPages}
						</p>
						<MoviesList
							movies={data.movieByTitle.movieList}
							pageCount={data.movieByTitle.totalPages}
							current={activePage}
							onPageClick={handlePageClick}
							genres={genres}
						/>
					</div>
				)}
				{loading && <div>Loading...</div>}
			</div>
		</Layout>
	);
};

export default withApollo(SearchPage);
