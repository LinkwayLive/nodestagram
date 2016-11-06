import { expect } from 'chai';
import { resolve } from 'path';
import InstagramApi from '../../src/index';

const credentials = require('../../credentials.json');

describe('#instagramApi upload from url', function () {
  this.timeout(10000);

  it('Should pass post an image from disk', function (done) {

    function success(d) {
      console.log(d);
      done();
    }

    function fail(err) {
      console.log(err);
      console.log(err.message);
      throw err;
    }

    const instagramApi = new InstagramApi(credentials);

    instagramApi
       .postFromUrl(
       'http://i0.wp.com/nyoobserver.files.wordpress.com/2016/11/gettyimages-481295252.jpg?quality=80&strip&ssl=1',
       '#chapelle')
       .then(success)
       .catch(fail);
  });
});
