import stateChannels from "../store-modules/channels/state"
import mutationsChannels from "../store-modules/channels/mutations"
import actionsChannels from "../store-modules/channels/actions"
import gettersChannels from "../store-modules/channels/getters"

export const state = () => stateChannels

export const mutations = mutationsChannels

export const actions = actionsChannels

export const getters = gettersChannels
