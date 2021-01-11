import { RESTDataSource } from "apollo-datasource-rest";
import { ProviderType, QueryNowPlayingArgs } from "../generated/graphql";
import { MOVIE_URL, SMALLIMG_URL } from "../constants";

export class TMDBSource extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = MOVIE_URL;
		this.imgURL = SMALLIMG_URL;
	}
	imgURL: string;

	async nowPlaying(page: QueryNowPlayingArgs) {
		const response = await this.get(
			`/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&page=${page}`
		);

		return {
			movieList: response.results.map((v) => ({
				id: v.id,
				title: v.title,
				overview: v.overview,
				backdrop: v.backdrop_path && `${this.imgURL}/${v.backdrop_path}`,
				releaseDate: v.release_date,
				genreIds: v.genre_ids,
			})),
			minDate: response.dates.minimum,
			maxDate: response.dates.maximum,
			totalPages: response.total_pages,
			totalResults: response.total_results,
		};
	}

	async topRated(page: number) {
		const response = await this.get(
			`/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&page=${page}`
		);
		return {
			movieList: response.results.map((v) => ({
				id: v.id,
				title: v.title,
				overview: v.overview,
				backdrop: v.backdrop_path && `${this.imgURL}/${v.backdrop_path}`,
				releaseDate: v.release_date,
				genreIds: v.genre_ids,
			})),
			totalPages: response.total_pages,
			totalResults: response.total_results,
		};
	}

	async upcoming(page: number) {
		const response = await this.get(
			`/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&page=${page}`
		);
		return {
			movieList: response.results.map((v) => ({
				id: v.id,
				title: v.title,
				overview: v.overview,
				backdrop: v.backdrop_path && `${this.imgURL}/${v.backdrop_path}`,
				releaseDate: v.release_date,
				genreIds: v.genre_ids,
			})),
			minDate: response.dates.minimum,
			maxDate: response.dates.maximum,
			totalPages: response.total_pages,
			totalResults: response.total_results,
		};
	}

	async movieById(id) {
		const response = await this.get(
			`/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
		);
		const wpResponse = await this.get(
			`/movie/${id}/watch/providers?api_key=${process.env.TMDB_API_KEY}`
		);
		const flatrateRes = wpResponse.results.US?.flatrate || [];
		const rentRes = wpResponse.results.US?.rent || [];
		const buyRes = wpResponse.results.US?.buy || [];

		return {
			id: response.id,
			title: response.title,
			overview: response.overview,
			poster: response.poster_path && `${this.imgURL}/${response.poster_path}`,
			genres: response.genres.map((v) => v.name).join(", "),
			releaseDate: response.release_date,
			voteAverage: response.vote_average,
			voteCount: response.vote_count,
			watchProviders: [
				{
					type: ProviderType.Flatrate,
					providers: flatrateRes.map((v) => ({
						name: v.provider_name,
						logoURL: v.logo_path && `${this.imgURL}/${v.logo_path}`,
					})),
				},
				{
					type: ProviderType.Rent,
					providers: rentRes.map((v) => ({
						name: v.provider_name,
						logoURL: v.logo_path && `${this.imgURL}/${v.logo_path}`,
					})),
				},
				{
					type: ProviderType.Buy,
					providers: buyRes.map((v) => ({
						name: v.provider_name,
						logoURL: v.logo_path && `${this.imgURL}/${v.logo_path}`,
					})),
				},
			],
		};
	}

	async byTitle(title, page) {
		const response = await this.get(
			`/search/movie?query=${title}&api_key=${process.env.TMDB_API_KEY}&page=${page}`
		);
		if (!response)
			return {
				movieList: null,
				totalPages: 0,
				totalResults: 0,
			};
		return {
			movieList: response.results.map((v) => ({
				id: v.id,
				title: v.title,
				overview: v.overview,
				backdrop: v.backdrop_path && `${this.imgURL}${v.backdrop_path}`,
				releaseDate: v.release_date,
				genreIds: v.genre_ids,
			})),
			totalPages: response.total_pages,
			totalResults: response.total_results,
		};
	}

	async byKeyword(keyword, page) {
		if (!keyword)
			return {
				movieList: null,
				totalPages: 0,
				totalResults: 0,
			};
		let keywordCode = parseInt(keyword);
		if (isNaN(keywordCode)) {
			const keywords = await this.get(
				`/search/keyword?query=${keyword}&api_key=${process.env.TMDB_API_KEY}&page=1`
			);
			const match = keywords.results.find((v) => v.name === keyword);
			keywordCode = match ? match.id : null;
			if (!keywordCode)
				return {
					movieList: null,
					totalPages: 0,
					totalResults: 0,
				};
		}
		const response = await this.get(
			`/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_keywords=${keywordCode}&vote_average.gte=6&sort_by=release_date.desc&page=${page}`
		);
		return {
			movieList: response.results.map((v) => ({
				id: v.id,
				title: v.title,
				overview: v.overview,
				backdrop: v.backdrop_path && `${this.imgURL}${v.backdrop_path}`,
			})),
			totalPages: response.total_pages,
			totalResults: response.total_results,
		};
	}
}
