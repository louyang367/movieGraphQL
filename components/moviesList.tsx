import React from "react";
import { SummaryMovie } from "../generated/graphql";
import MovieCard from "./MovieCard";
import { Pagination } from "@material-ui/lab";
import styled from "styled-components";

const StyledMoviesList = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: repeat(3, 250px);
	grid-auto-flow: row;
	grid-gap: 5px;
	
	@media (min-width: 1041px) {
		grid-template-columns: repeat(4, 300px);
	  }
    @media (max-width: 1040px) {
        grid-template-columns: repeat(3, 300px);
	}
	@media (max-width: 768px) {
		grid-template-columns: repeat(2, 250px);
	}
	@media (max-width: 540px) {
		grid-template-columns: repeat(1, 250px);
    }
`;
const SPagination = styled(Pagination)`
	margin-top: 2rem;
	display: flex;
	justify-content: center;
`;
interface Props {
	movies: SummaryMovie[];
	pageCount: number;
	current: number;
	onPageClick: (e:React.MouseEvent<HTMLElement>)=>void;
	genres: Record<string, string>;
}

const MoviesList: React.FC<Props> = ({ movies, pageCount, current, onPageClick, genres }) => {
	return (
		<>
			<StyledMoviesList>  
				{movies?.map((movie) => (
					<div key={movie.id}>
						<MovieCard movie={movie} genres={genres} />
					</div>
				))}
			</StyledMoviesList>

			{movies.length && (
				<SPagination
					showFirstButton
					showLastButton
					count={pageCount}
					page={current}
					onChange={onPageClick}
				/>
			)}
		</>
	);
};

export default MoviesList;
