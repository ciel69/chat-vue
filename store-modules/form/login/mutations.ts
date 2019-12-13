export default {
  login(state, data) {
    state = data
  },
  changeField(state, { name, value }) {
    state[name] = value
  }
}
