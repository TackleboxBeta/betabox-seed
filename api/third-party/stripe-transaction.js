import _ from 'lodash';
import stripeService from 'stripe';
import { stripe as stripeConfig } from '../config';

const stripe = stripeService(process.env.NODE_ENV === 'production' ? stripeConfig.apiKey : stripeConfig.demoApiKey);

function stripeTransaction(params) {
  return new Promise((resolve, reject) => {
    // Price can be 0, so we do a nil check here, instead
    if (_.get(params, 'stripeToken') && !_.isNil(_.get(params, 'price')) && _.get(params, 'description')) {
      stripe.charges.create({
        amount: Math.max(params.price * 100, 50), // Amount in cents, 1 is the minimum
        currency: 'usd',
        source: params.stripeToken,
        description: params.description
      }, (err, charge) => {
        if (_.get(err, 'type') === 'StripeCardError') {
          reject(stripeTransaction.CARD_DECLINED);
        } else if (err) {
          reject(err);
        } else {
          resolve(charge);
        }
      });
    } else {
      reject('Your transaction requires a stripeToken, price, and description property in the params.');
    }
  });
}

stripeTransaction.CARD_DECLINED = 'Your card has been declined.';

export default stripeTransaction;
