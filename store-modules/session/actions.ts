export default {
  async initSession({ dispatch, commit }, { req }) {
    // Get session ID:
    const sessionId = req.session.id

    // Or set initial session state:
    if (req.session) {
      commit("session/setSession", req.session, { root: true })
    }
  }
}
