import ApolloNuxt from "./ApolloNuxt"

import apolloAuth from "../middleware/apollo-auth"

const apolloNuxt = ctx =>
  new ApolloNuxt(ctx).setMiddleware([apolloAuth]).connect()

export default apolloNuxt
