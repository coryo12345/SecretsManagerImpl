// services.ts
import { store } from '../store/index';
import supabase from '../plugins/supabase';
import SecretGroup from '../types/SecretGroup';
import { actions } from './constants';
import Secret from '../types/Secret';
import FullSecret from '../types/FullSecret';

export async function fetchSecrets(): Promise<FullSecret[]> {
  return Promise.all([
    supabase.from('secrets_group').select('*'),
    supabase.from('secrets').select('*'),
  ]).then((values) => {
    const { data: sgData, error: sgError } = values[0];
    const { data: sData, error: sError } = values[1];

    // check error
    if (sgError || sError) {
      store.dispatch(actions.snackbar.add, {
        type: 'error',
        message: 'We were unable to fetch secrets. Please try again later.',
      });
      return [];
    }

    // combine data
    const groups: FullSecret[] = [];
    sgData.forEach((group: SecretGroup) => {
      const fs: FullSecret = {
        group,
        secrets: [],
      };
      groups.push(fs);
    });
    sData.forEach((secret: Secret) => {
      const fs: FullSecret = groups.find(
        (f: FullSecret) => f.group.id === secret.group_id
      );
      fs.secrets.push(secret);
    });

    return groups;
  });
}

export async function addSecretGroup(
  group: SecretGroup
): Promise<SecretGroup[]> {
  const { data, error } = await supabase.from('secrets_group').insert([group]);
  if (error) {
    store.dispatch(actions.snackbar.add, {
      type: 'error',
      message: 'We were unable to add a secret group. Please try again later.',
    });
  }
  return data as SecretGroup[];
}

export async function addSecret(secret: Secret): Promise<Secret[]> {
  const { data, error } = await supabase.from('secrets').insert([secret]);
  if (error) {
    store.dispatch(actions.snackbar.add, {
      type: 'error',
      message: 'We were unable to add a secret. Please try again later.',
    });
  }
  return data as Secret[];
}

export async function deleteSecret(secret: Secret): Promise<Secret[]> {
  const { data, error } = await supabase
    .from('secrets')
    .delete()
    .match({ name: secret.name, group_id: secret.group_id });
  if (error) {
    store.dispatch(actions.snackbar.add, {
      type: 'error',
      message: 'We were unable to add a secret. Please try again later.',
    });
  }
  return data as Secret[];
}

export default {
  fetchSecrets,
  addSecretGroup,
  addSecret,
  deleteSecret,
};
