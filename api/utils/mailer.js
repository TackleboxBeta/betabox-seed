import _ from 'lodash';
import powerdrill from 'powerdrill';

export default powerdrill(_.get(require('../config'), 'mandrill.apiKey'));