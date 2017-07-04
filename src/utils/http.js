import request from 'superagent';

export const get = (url) => new Promise(
  (resolve, reject) => {
    request
      .get(url)
      .end((_, response) => {
        if (response.ok) {
          resolve(response.body);
        } else {
          reject(response);
        }
      });
  }
);
