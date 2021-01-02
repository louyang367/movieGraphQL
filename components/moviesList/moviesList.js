import React from "react";
import Link from "next/link";
import styled from "styled-components";

const StyledAlink = styled.a`
	color: initial;
	text-decoration: none;
	:link {
		color: blue;
	}
	:visited {
		color: green;
	}
	:hover {
		background: grey;
	}
`;
const StyledP = styled.p`
`;
const StyledH3 = styled.h3`
	height: 20%;
	background-color: grey;
`;
const MovieCard = ({ movie }) => {
	const StyledDiv = styled.div`
	border: 1px solid grey;
    border-radius: 3px;
    overflow: hidden;
    text-overflow: ellipsis;

	`;
	return (
		<StyledDiv>
			<Link href={`/graph/${movie.id}`}>
				<StyledAlink>
					{/* {game.cover && game.cover.url && <img src={game.cover.url} alt="" />} */}
					<StyledH3>{movie.title}</StyledH3>
					<img src={`https://image.tmdb.org/t/p/w300/${movie.backdrop}`} />
					<styledP>{movie.overview}</styledP>
				</StyledAlink>
			</Link>
		</StyledDiv>
	);
};

const MoviesList = ({ className, movies }) => {
	return (
		<div className={className}>
			{movies.map((movie) => (
				<MovieCard key={movie.id} movie={movie} />
			))}
		</div>
	);
};
const styledMoviesList = styled(MoviesList)`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-auto-rows: 400px;
	grid-gap: 5px;
`;

export default styledMoviesList;
