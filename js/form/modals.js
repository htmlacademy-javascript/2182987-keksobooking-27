import {body} from './form-utils.js';

const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const successModal = successModalTemplate.cloneNode(true);

const closeSuccessModal = () => {
  successModal.remove();
  successModal.removeEventListener('click', closeSuccessModal);
};
const showSuccessModal = () => {
  body.append(successModal);
  successModal.addEventListener('click', closeSuccessModal);
};

//showSuccessModal();
export {showSuccessModal};

