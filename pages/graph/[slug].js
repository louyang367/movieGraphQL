import { withApollo } from "../../apollo/client";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";

const QUERY = gql`
	query($id: String) {
		movieById(id: $id) {
			id
			title
			overview
			poster
			genres
			releaseDate
			voteAverage
			voteCount
			watchProviders {
				type
				providers {name logoURL}
			}
		}
	}
`;
const MovieDetail = () => {
	const router = useRouter();
	const { slug } = router.query;
	const { loading, error, data = {} } = useQuery(QUERY, {
		variables: { id: slug },
	});
	const { movieById = null } = data;
  console.log("***by ID from useQuery", data);

	// const { loading, error, data, refetch } = gqlres;

	// useEffect(() => {
	// 	refetch();
	// 	term && Router.push("/", { query: { s: term } });
	// }, [term]);

	return (
		<div>
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
					<img
						src={`https://image.tmdb.org/t/p/w300/${movieById.poster}`}
						alt="poster"
					/>
					<p>Title: {movieById.title}</p>
					<p>Overview: {movieById.overview}</p>
					<p>Genres: {movieById.genres}</p>
					<p>Rlease date: {movieById.releaseDate}</p>
					<p>Vote average: {movieById.voteAverage}</p>
					<p>Vote count: {movieById.voteCount}</p>
					<p>Watch providers: </p>
					{movieById.watchProviders.map(x=>
						<>
							{x.type} 
							<ul> {x.providers.map(y=><li><img src={`https://image.tmdb.org/t/p/w300/${y.logoURL}`} width={50} alt={y.name} title={y.name}/></li>)} </ul> 
						</>) }
				</div>
			)}
			{loading && <div>Loading...</div>}
			<hr />
			<span onClick={() => router.back()}>Click here to go back</span>
		</div>
	);
};

export default withApollo(MovieDetail);
