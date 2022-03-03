// store.ts
import { createStore } from 'vuex';
import SnackbarMessage, { MESSAGE_DURATION } from '../types/SnackbarMessage';
export interface State {
  title: string;
  snackbarMessages: SnackbarMessage[];
}

export const store = createStore<State>({
  state: {
    title: 'SecretsManager',
    snackbarMessages: [],
  },
  actions: {
    addSnackbarMessage({ commit }, message: SnackbarMessage) {
      commit('ADD_SNACKBAR_MESSAGE', message);
      setTimeout(() => {
        commit('REMOVE_SNACKBAR_MESSAGE');
      }, MESSAGE_DURATION);
    },
  },
  mutations: {
    ADD_SNACKBAR_MESSAGE(state: State, message: SnackbarMessage) {
      state.snackbarMessages.push(message);
    },
    REMOVE_SNACKBAR_MESSAGE(state: State) {
      state.snackbarMessages.shift();
    },
  },
});
