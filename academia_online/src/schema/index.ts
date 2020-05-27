import 'graphql-import-node';
import { GraphQLSchema } from 'graphql';
import typeDefs from './schema.graphql';
import resolvers from './../resolvers/resolversMap';
import { makeExecutableSchema } from 'graphql-tools';


const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default schema;