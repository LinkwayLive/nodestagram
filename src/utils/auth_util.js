/**
 * @module auth_util
 */

import { createHmac } from 'crypto';
import { random } from 'lodash';

const versions = ['GT-N7000', 'SM-N9000', 'GT-I9220', 'GT-I9100'];
const resolutions = ['720x1280', '320x480', '480x800', '1024x768', '1280x720', '768x1024', '480x320'];
const dpis = ['120', '160', '320', '240'];
const instVersion = '9.0.1';

export function timestamp() {
  return Math.floor(new Date().getTime() / 1000);
}

export function selectRandom(xs) {
  return xs[random(0, xs.length - 1)];
}

export function generateUserAgent() {
  const ver = selectRandom(versions);
  const res = selectRandom(resolutions);
  const dpi = selectRandom(dpis);

  const andVersion = [random(10, 11), [random(1, 3), random(3, 5), random(0, 5)]
      .join('.')].join('/');

  return `Instagram ${instVersion} Android ${andVersion}; ${dpi}; ${res}; samsung; ${ver}; ${ver}; smdkc210; en_US)`;
}

export function generateSignature(data) {
  const hmac = createHmac(
    'sha256',
    '96724bcbd4fb3e608074e185f2d4f119156fcca061692a4a1db1c7bf142d3e22'
  );

  hmac.update(data);
  return hmac.digest('hex');
}
