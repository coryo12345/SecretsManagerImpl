// services.ts
import { store } from '../store/index';
import supabase from '../plugins/supabase';
import SecretGroup from '../types/SecretGroup';
import { actions } from './constants';

export async function fetchSecrets(): Promise<SecretGroup[]> {
  const { data, error } = await supabase.from('secrets_group').select('*');
  if (error) {
    store.dispatch(actions.snackbar.add, {
      type: 'error',
      message: 'We were unable to fetch secret groups. Please try again later.',
    });
    return [];
  }
  const groups = data as SecretGroup[];
  return groups;
}

export async function addSecretGroup(group: SecretGroup) {
  const { error } = await supabase.from('secrets_group').insert([group]);
  if (error) {
    store.dispatch(actions.snackbar.add, {
      type: 'error',
      message: 'We were unable to add a secret group. Please try again later.',
    });
  }
}

export default {
  fetchSecrets,
};
