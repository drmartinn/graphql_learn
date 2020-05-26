import express from 'express';
import compression from 'compression';
import cors from 'cors';
import {IResolvers, makeExecutableSchema} from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import graphqlHTTP from 'express-graphql';

const app = express();
app.use('*', cors());
app.use(compression());

const typeDefs = `
    type Query {
        hola: String!
        holaConNombre(nombre: String!): String!
        holaGraphql: String!
    }
`;

const resolvers : IResolvers = {
    Query : {
        hola() :string {
            return "Hola mundo";
        },
        holaConNombre(__:void, {nombre}): string {
            return `Hola mundo ${nombre}`;
        },
        holaGraphql():string {
            return "hola graphql";
        }
    }
}


const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
})


app.use('/', graphqlHTTP({
    schema,
    graphiql: true
}));
const PORT = 5300;
app.listen(
    {port: PORT},
    ()=>console.log(`Hola mundo Graphql http://localhost:${PORT}/graphql`)
    )