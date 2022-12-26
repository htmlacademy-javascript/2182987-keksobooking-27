const sendOfferForm = (evt, onSuccess, onError) => {
  const formData = new FormData(evt.target);
  fetch(
    'https://27.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Ошибка отравки данных');
      }
    })
    .then(() => {
      onSuccess();
    })
    .catch((error) => {
      onError(error.message);
    });
};

const getOffers = (onSuccess, onError) => {
  fetch('https://27.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Ошибка получения данных');
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => {
      onError(error.message);
    });
};

export {sendOfferForm, getOffers};

