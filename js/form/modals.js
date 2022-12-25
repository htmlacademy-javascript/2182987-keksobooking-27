import {body} from './form-utils.js';
import {isEscape} from '../common/utils.js';

const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const successModal = successModalTemplate.cloneNode(true);
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');
const errorModal = errorModalTemplate.cloneNode(true);

const onSuccessModalClick = () => {
  successModal.remove();
  successModal.removeEventListener('click', onSuccessModalClick);
};

const onErrorModalClick = () => {
  errorModal.remove();
  errorModal.removeEventListener('click', onErrorModalClick);
};

const onEscKeydown = (evt) => {
  if(isEscape(evt)) {
    evt.preventDefault();

    const successExist = document.querySelector('.success__message');
    const errorExist = document.querySelector('.error__message');

    if(successExist && !errorExist) {
      onSuccessModalClick();
    } else {
      onErrorModalClick();
    }

    document.removeEventListener('keydown', onEscKeydown);
  }
};
const showSuccessModal = () => {
  body.append(successModal);
  successModal.addEventListener('click', onSuccessModalClick);
  document.addEventListener('keydown', onEscKeydown);
};

const showErrorModal = (message) => {
  body.append(errorModal);
  errorModal.addEventListener('click', onErrorModalClick);
  document.addEventListener('keydown', onEscKeydown);

  if(message) {
    errorModal.querySelector('.error__message').textContent = message;
  }
};

export {showSuccessModal, showErrorModal};

