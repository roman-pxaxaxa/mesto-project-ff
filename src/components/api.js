const cohortId = 'wff-cohort-4';
const token = '008f1cc3-73b7-4777-9b97-32f6f0126a51';

function getRequest(path) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/${path}`, {
      headers: {
        authorization: token
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};

function makeRequestByType(type, path, data) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/${path}`, {
      method: type,
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      ...(data && {
        body: JSON.stringify(data)
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export {
  getRequest,
  makeRequestByType
}