// store.ts
import { createStore } from 'vuex';
export interface State {
  title: string;
}

export const store = createStore<State>({
  state: {
    title: 'SecretsManager',
  },
});
