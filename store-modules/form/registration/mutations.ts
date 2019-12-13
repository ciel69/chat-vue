export default {
  login(state, data) {
    state = data
  },
  changeField(state, { name, value }) {
    console.log("changeField", name)
    console.log("changeField", value)
    state[name] = value
  }
}
