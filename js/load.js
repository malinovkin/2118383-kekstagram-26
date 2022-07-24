function createLoader(onSuccess, onError) {
  return fetch(
    'https://26.javascript.pages.academy/kekstagram/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  }).then((data) => {
    onSuccess(data);
  }).catch((err) => {
    onError(err);
  });
}

export {createLoader};
