const SERVER_HOST = '26.javascript.pages.academy';

const getData = (onSuccess, onFail) => {
  fetch(`https://${SERVER_HOST}/kekstagram/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    }).then((data) => {
      onSuccess(data);
    }).catch((err) => {
      onFail(err);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    `https://${SERVER_HOST}/kekstagram`,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => onFail('Не удалось отправить форму. Попробуйте ещё раз'));
};

export {getData, sendData};
