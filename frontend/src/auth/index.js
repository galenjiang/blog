import jsonp from 'jsonp';
import axios from 'axios';
import config from '../config';
import userStore from '../user-strore';
import axiosCustomed from '../axios';

export default () => new Promise((resolve, reject) => {
  jsonp(`${config.videojjDomain}/api/jsonp/getCookie.js?callback=`, {
    prefix: 'liveJSONP',
  }, async (err, data) => {
    if (err || (data && typeof data === 'object' && !Object.keys(data).length)) {
      reject();
    }
    let res = await axios.get(`${config.domain}/api/users/auth/${data.token}`);
    if (res.status !== 200 || res.status !== 0) {
      reject();
    }
    userStore.token = res.data.result.token;
    axiosCustomed.setToken(res.data.result.token);
    res = await axios.get(`${config.domain}/api/users/admin?token=${userStore.token}`);
    userStore.info = res.data.result;
    resolve();
  });
});
