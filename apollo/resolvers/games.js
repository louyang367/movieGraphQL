export default {
	Query: {
		movieById: async (_parent, { id }, _context, _info) => {
			console.log("***id,", _parent, id, _context);
			return _context.dataSources.IGDB.movieById(id);
		},
		nowPlaying: async (_parent, { page }, _context, _info) => {
			console.log("***params,", page, _context);
			return _context.dataSources.IGDB.nowPlaying(page);
		},
		movieByKeyword: async (_parent, args, _context, _info) => {
			console.log("***params,", args, _context);
			return _context.dataSources.IGDB.byKeyword(args.keyword, args.page);
		},
	},
};
