import {body} from './form-utils.js';
import {isEscape} from '../common/utils.js';

const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const successModal = successModalTemplate.cloneNode(true);
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');
const errorModal = errorModalTemplate.cloneNode(true);
const successExist = document.querySelector('.success__message');
const errorExist = document.querySelector('.error__message');

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

const onDataError = (error = {message: 'Произошла ошибка загрузки данных.'}) => {
  const errorBlock = document.createElement('div');
  errorBlock.style.position = 'absolute';
  errorBlock.style.zIndex = '9999';
  errorBlock.style.top = '16px';
  errorBlock.style.left = '16px';
  errorBlock.style.width = '200px';
  errorBlock.style.maxWidth = '100vw';
  errorBlock.style.padding = '8px';
  errorBlock.style.borderRadius = '12px';
  errorBlock.style.fontSize = '12px';
  errorBlock.style.textAlign = 'center';
  errorBlock.style.backgroundColor = '#cb5b5b';
  errorBlock.style.color = '#ffffff';
  errorBlock.style.opacity = '0';
  errorBlock.style.transition = 'opacity 0.4s';
  errorBlock.innerText = error.message;
  setTimeout(() => {
    errorBlock.style.opacity = '1';
  }, 200);
  setTimeout(() => {
    errorBlock.remove();
  }, 2000);
  body.append(errorBlock);
};

export {showSuccessModal, showErrorModal, onDataError};

