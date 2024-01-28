import { checkResponse } from "../utils/utils";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4/',
  headers: {
    authorization: '008f1cc3-73b7-4777-9b97-32f6f0126a51',
    'Content-Type': 'application/json',
  }
}

function getRequest(path) {
  return fetch(config.baseUrl + path, {
      headers: config.headers
    })
    .then(checkResponse);
};

function makeRequestByType(type, path, data) {
  return fetch(config.baseUrl + path, {
      method: type,
      headers: config.headers,
      ...(data && {
        body: JSON.stringify(data)
      })
    })
    .then(checkResponse);
};

export {
  getRequest,
  makeRequestByType
}