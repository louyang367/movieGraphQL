// import { importSchema } from 'graphql-import';
// export default importSchema('apollo/types/*.graphql');
// export default importSchema('./*.graphql');
// import {join} from 'path';
import { loadSchemaSync } from "@graphql-tools/load";
import {GraphQLFileLoader} from "@graphql-tools/graphql-file-loader";

const typeDefs = loadSchemaSync("./*.graphql", {
	loaders: [new GraphQLFileLoader()],
});

console.log("***typeDefs", typeDefs);
export default typeDefs;
