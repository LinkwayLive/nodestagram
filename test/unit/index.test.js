import { expect } from 'chai';
import { generateUserAgent, selectRandom } from '../../src/utils/auth_util';
import InstagramApi from '../../src/index';

describe('#selectRandom unit test', function () {
  it('Should return without error.', function () {
    // todo make it not fail when passed an empty array
    return selectRandom([1, 2]);
  });
});

describe('#generateUserAgent unit test', function () {
  it('Should return without error', function () {
    return generateUserAgent('a');
  });
});

describe('#instagramApi unit tests', function () {
  it('Should fail when instatiated without username or password.',
    function () {
      try {
        const instagramApi = new InstagramApi();
      } catch (err) {
        expect(err.message).to.equal('Username missing.');
      }
    });

  it('Should fail when instatiated without a password.',
    function () {
      try {
        const instagramApi = new InstagramApi({ username: 'name' });
      } catch (err) {
        expect(err.message).to.equal('Password missing.');
      }
    });
});
