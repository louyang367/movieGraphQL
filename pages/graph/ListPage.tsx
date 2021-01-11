import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { withApollo } from "../../apollo/client";
import MoviesList from "../../components/moviesList";
import {
	NowPlayingDocument,
	TopRatedDocument,
	UpcomingDocument,
} from "../../generated/graphql";
import Layout from "../../components/layout";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import { Pagination } from "@material-ui/lab";
import styled from "styled-components";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import Head from 'next/head';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControl: {
			margin: theme.spacing(1),
			minWidth: 220,
			marginTop: 15,
			width: "100%",
		},
		select: {
			width: "80%",
			marginLeft: "auto",
			marginRight: "auto",
		},
	})
);

const ListData = styled.div`
	display: flex;
	justify-content: center;
`;
const SPagination = styled(Pagination)`
	margin-top: 10px;
	display: flex;
	justify-content: center;
`;

const Index = ({ genres }) => {
	const classes = useStyles();
	const [listType, setListType] = React.useState("nowPlaying");
	const [activePage, setPage] = useState(1);
	const gqlres = {};
	gqlres["upcoming"] =
		useQuery(UpcomingDocument, {
			variables: { page: activePage },
		}) || {};
	gqlres["topRated"] =
		useQuery(TopRatedDocument, {
			variables: { page: activePage },
		}) || {};
	gqlres["nowPlaying"] =
		useQuery(NowPlayingDocument, {
			variables: { page: activePage },
		}) || {};
	const { loading, error, data, refetch } = gqlres[listType] || {};

	const handleListChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setPage(1);
		setListType(event.target.value as string);
	};
	const handlePageClick = (e: React.MouseEvent<HTMLElement>) => {
		const page = parseInt((e.target as HTMLElement).innerText);
		setPage(page);
		refetch({ page: page });
	};

	return (
		<Layout>
			<Head>
				<title>
					Browse new releases, top rated, and upcoming movies
				</title>
			</Head>

			<FormControl className={classes.formControl}>
				<div className={classes.select}>
					<Select
						fullWidth
						value={listType}
						onChange={handleListChange}
					>
						<MenuItem value={"nowPlaying"}>Now playing</MenuItem>
						<MenuItem value={"topRated"}>Top rated</MenuItem>
						<MenuItem value={"upcoming"}>Upcoming</MenuItem>
					</Select>
					<FormHelperText>What list do you want to see?</FormHelperText>
				</div>
			</FormControl>

			<ListData>
				{error && <div>{error}</div>}
				{loading && <div>Loading...</div>}
				{data && (
					<div>
						<p>
							Total results: {data[listType]?.totalResults}, total pages:{" "}
							{data[listType]?.totalPages}
						</p>
						<p>
							{(listType === "nowPlaying" || listType === "upcoming") &&
								`Date range: ${data[listType].minDate} to ${data[listType].maxDate}`}
						</p>
						<MoviesList
							movies={data[listType].movieList}
							pageCount={data[listType].totalPages}
							current={activePage}
							onPageClick={handlePageClick}
							genres={genres}
						/>
					</div>
				)}
			</ListData>
		</Layout>
	);
};

export default withApollo(Index);
