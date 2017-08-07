import memoize from 'lru-memoize';
import { createValidator, required, match } from 'utils/validation';

const tempPasswordForceChangeValidation = createValidator({
  password: required,
  password_confirmation: [required, match('password')]
});
export default memoize(10)(tempPasswordForceChangeValidation);
