import { createReadStream } from 'fs';
import { v1 as uuidV1 } from 'uuid';
import { extend } from 'lodash';
import { default as request } from './utils/request_util';
import { timestamp, generateUserAgent, generateSignature } from './utils/auth_util';

const jar = request.jar;

/**
 * Class InstagramApi contains all the methods needed to interact
 * with instagram.
 * @class InstagramApi
 */
export default class InstagramApi {
  constructor(config = { debug: false }) {
    const {
      username,
      password
    } = config;

    if (!username) {
      const errMsgKey = 'Username missing.';
      throw new Error(errMsgKey);
    }

    if (!password) {
      const errMsgPass = 'Password missing.';
      throw new Error(errMsgPass);
    }

    extend(this, config);

    this.uid = uuidV1();
    this.userAgent = generateUserAgent();
    this.deviceId = 'android-4bca48fddbe5477d';
    this.endpointUrl = 'https://i.instagram.com/api/v1';
    this.jar = jar();

    // Provide a default logger via console
    if (!this.log && this.debug) {
      this.log = function log(val) {
        console.log(val); // eslint-disable-line no-console
      };
      return this;
    }

    this.log = function noop() {
    };
    return this;
  }

  /**
   * Method to generate the session to Instagram.
   * @method login
   * @return {Object} Whether or not the promise is fulfilled.
   */
  login() {
    this.log('login');
    const conf = JSON.stringify({
      device_id: this.deviceId,
      _uuid: this.uid,
      username: this.username,
      password: this.password,
      _csrftoken: 'missing',
      login_attempt_count: 0
    });

    const signature = generateSignature(conf);

    return request.postAsync({
      uri: `${this.endpointUrl}/accounts/login/`,
      headers: {
        'USER-AGENT': this.userAgent
      },
      jar: this.jar,
      form: {
        signed_body: `${signature}.${conf}`,
        ig_sig_key_version: 4
      }
    }).then(function parseBodyLogin(resp) {
      this.log('parseBodyLogin');

      const body = JSON.parse(resp.body);
      if (body.status !== 'ok') {
        throw new Error(body);
      }
      return body;
    }.bind(this));
  }

  /**
   * Method to create a photo in instagram from a local filepath.
   * @method uploadPhoto
   * @return {Object} Whether or not the promise is fulfilled.
   */
  uploadPhoto(source, captionText, isFilePath) {
    this.log('uploadPhoto');
    const stamp = timestamp();
    const formData = {
      _csrftoken: 'missing',
      upload_id: stamp,
      device_id: this.deviceId,
      _uuid: this.uid,
      image_compression: '{"lib_name":"jt","lib_version":"1.3.0","quality":"70"}',
      filename: `pending_media_${stamp}.jpg`,
      photo: (isFilePath ? createReadStream(source) : request.get({ uri: source }))
    };
    return request.postAsync({
      headers: {
        'USER-AGENT': this.userAgent
      },
      uri: `${this.endpointUrl}/upload/photo/`,
      jar: this.jar,
      formData
    }).then(function parseBodyPhotoId(resp) {
      this.log('parseBodyPhotoId');
      this.log(resp.body);

      const body = JSON.parse(resp.body);
      if (!body.upload_id) {
        throw new Error(resp.body);
      }
      const uploadId = body.upload_id;
      return { uploadId, captionText };
    }.bind(this))
      .then(this.configurePhoto.bind(this));
  }

  configurePhoto({
    uploadId,
    captionText
  }) {
    this.log('configurePhoto');
    const conf = JSON.stringify({
      device_id: this.deviceId,
      _uuid: this.uid,
      _csrftoken: 'missing',
      media_id: uploadId,
      caption: captionText,
      device_timestamp: timestamp(),
      source_type: '5',
      filter_type: '0',
      extra: '{}',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    });
    const signature = generateSignature(conf);
    return request.postAsync({
      uri: `${this.endpointUrl}/media/configure/`,
      headers: {
        'USER-AGENT': this.userAgent
      },
      jar: this.jar,
      form: {
        signed_body: `${signature}.${conf}`,
        ig_sig_key_version: 4
      }
    }).then(function parseBodyConfigure(resp) {
      this.log('parseBodyConfigure');
      this.log(resp.body);
      const body = JSON.parse(resp.body);
      if (body.status !== 'ok') {
        throw new Error(resp.body);
      }
      return body;
    }.bind(this));
  }

  postFromUrl(url, caption) {
    this.log('postFromUrl');
    return this.login()
      .then(function uploadFromUrl() {
        this.log('uploadFromUrl');
        return this.uploadPhoto(url, caption);
      }.bind(this));
  }

  postFromFilepath(filepath, caption) {
    return this.login()
      .then(function uploadFromFilePath() {
        return this.uploadPhoto(filepath, caption, true);
      }.bind(this));
  }
}
