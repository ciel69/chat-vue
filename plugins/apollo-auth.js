export default (context) => {
    console.log('apollo-auth', context);
/*    let token = context.store.state.token
    let client = context.app.apolloProvider.defaultClient
    client.networkInterface.use([{
        applyMiddleware (req, next) {
            if (!req.options.headers) req.options.headers = {}
            req.options.headers['Authorization'] = `Bearer ${token}`
            next()
        }
    }])*/
}
