import { ApolloLink } from "apollo-link"

const middlewareLink = ctx => {
  return new ApolloLink((operation, forward) => {
    const {
      store: { state }
    } = ctx
    const { token } = state.user

    operation.setContext(() => ({
      headers: {
        authorization: `Bearer ${token}`
      }
    }))
    return forward(operation)
  })
}

export default middlewareLink
