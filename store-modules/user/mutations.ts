export default {
  checkToken(state, token) {
    state.token = token
  },
  login(state, data) {
    state.login = data.login
    state.firstName = data.firstName
    state.lastName = data.lastName
    state.email = data.email
    state.id = data.id
    state.token = data.token
  },
  loadToken(state, data) {
    state.token = data
  },
  sendMessage(state, data) {
    state.list.push(data)
  },
  chatChangeInput(state, data: string) {
    state.inputText = data
  }
}
