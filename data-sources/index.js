import { RESTDataSource } from "apollo-datasource-rest";

export class IGDBSource extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = "https://api.themoviedb.org/3";
	}

	async movieById(id) {
		console.log('***ENTERing movieById',id);
		const response = await this.get(
			`/movie/${id}?api_key=e66af17f2f3140e2b6d18e8aae36a5e4`
		);
		console.log("***movieById api", response);
		const wpResponse = await this.get(`/movie/${id}/watch/providers?api_key=e66af17f2f3140e2b6d18e8aae36a5e4`);
		const flatrateRes = 	wpResponse.results.US.flatrate || [];
		const rentRes = wpResponse.results.US.rent || [];
		const buyRes = wpResponse.results.US.buy || [];

		return {
			id: response.id,
			title: response.title,
			overview: response.overview,
			poster: response.poster_path,
			genres: response.genres.map(v=>v.name).join(', '),
			releaseDate: response.release_date,
			voteAverage: response.vote_average,
			voteCount: response.vote_count,
			watchProviders: [
				{type: 'FLATRATE', providers: flatrateRes.map(v=>({name: v.provider_name, logoURL: v.logo_path}))},
				{type: 'RENT', providers: rentRes.map(v=>({name: v.provider_name, logoURL: v.logo_path}))},
				{type: 'BUY', providers: buyRes.map(v=>({name: v.provider_name, logoURL: v.logo_path}))}
			]
		}
	}
	async nowPlaying(page) {
		console.log("***inside nowPlaying", page);
		const response = await this.get(
			`/movie/now_playing?api_key=e66af17f2f3140e2b6d18e8aae36a5e4&page=${page}`
		);
		console.log("***nowPlaying api", page, response);
		return {
			movieList: response.results.map(v=>({id:v.id, title:v.title,overview:v.overview,backdrop:v.backdrop_path})),
			minDate: response.dates.minimum,
			maxDate: response.dates.maximum,
			totalPages: response.total_pages,
			totalResults: response.total_results,
		};
	}
	async byKeyword(keyword, page) {
		console.log("***inside byKeyword", keyword, page);
    // const response = await this.get(`/search/movie?query=${keyword}&api_key=e66af17f2f3140e2b6d18e8aae36a5e4&page=${page}`);
    if (!keyword) return {
      movieList: null,
      totalPages: 0,
      totalResults: 0,
    };
		let keywordCode = parseInt(keyword);
		if (isNaN(keywordCode)) {
			const keywords = await this.get(
				`/search/keyword?query=${keyword}&api_key=e66af17f2f3140e2b6d18e8aae36a5e4&page=1`
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
    console.log('***keywordCode',keywordCode);
		const response = await this.get(
			`/discover/movie?api_key=e66af17f2f3140e2b6d18e8aae36a5e4&with_keywords=${keywordCode}&vote_average.gte=6&sort_by=release_date.desc&page=${page}`
		);
		console.log("***byKeyword api", page, response);
		return {
			movieList: response.results.map(v=>({id:v.id, title:v.title,overview:v.overview,backdrop:v.backdrop_path})),
			totalPages: response.total_pages,
			totalResults: response.total_results,
		};
	}
}
