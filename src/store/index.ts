// store.ts
import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

export interface State {
  title: string;
}

// export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    title: 'SecretsManager',
  },
});

// define your own `useStore` composition function
// export function useStore() {
//   return baseUseStore(key);
// }
