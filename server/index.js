const { ApolloServer } = require("apollo-server-express")
const express = require("express")
const app = express()
const database = require("./config/database")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers/index")

database.connect()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        return {
            req,
            param: 123456
        }
    }
})
async function serverStart() {
    await server.start();
    server.applyMiddleware({ app })
}
serverStart()
app.listen(5000, () => {
    console.log("server listen at prot 5000")
})