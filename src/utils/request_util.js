/**
 * @module request_util
 */
import P from 'bluebird';
import request from 'request';

export default P.promisifyAll(request);
