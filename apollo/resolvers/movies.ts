export default {
	Query: {
		nowPlaying: async (_parent, { page }, _context, _info) => {
			return _context.dataSources.TMDB.nowPlaying(page);
		},
		topRated: async (_parent, { page }, _context, _info) => {
			return _context.dataSources.TMDB.topRated(page);
		},
		upcoming: async (_parent, { page }, _context, _info) => {
			return _context.dataSources.TMDB.upcoming(page);
		},
		movieById: async (_parent, { id }, _context, _info) => {
			return _context.dataSources.TMDB.movieById(id);
		},
		movieByTitle: async (_parent, args, _context, _info) => {
			return _context.dataSources.TMDB.byTitle(args.title, args.page);
		},
		movieByKeyword: async (_parent, args, _context, _info) => {
			return _context.dataSources.TMDB.byKeyword(args.keyword, args.page);
		},
	},
};
