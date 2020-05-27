import express from 'express';
import expressPlayGround from 'graphql-playground-middleware-express';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';

const app = express();
app.use('*', cors());
app.use(compression());

const server = new ApolloServer({
    schema,
    introspection: true
});

server.applyMiddleware({ app });
app.get('/', expressPlayGround({
    endpoint: '/graphql'
}));
const httpServer = createServer(app);
const PORT = 5300;
httpServer.listen(
    { port: PORT },
    () => console.log(`Graphql http://localhost:${PORT}`)
);