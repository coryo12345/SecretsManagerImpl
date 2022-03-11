import Secret from './Secret';
import SecretGroup from './SecretGroup';

export default interface FullSecret {
  group: SecretGroup;
  secrets: Secret[];
}
