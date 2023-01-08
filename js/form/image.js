import {photoInput, photoHolder, avatarInput, avatarImage} from './form-utils.js';

const onPhotoChange = (evt) => {
  const img = document.createElement('img');
  img.src = URL.createObjectURL(evt.target.files[0]);
  photoHolder.style.overflow = 'hidden';
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'cover';

  const existImg = photoHolder.querySelector('img');
  if(existImg) {
    existImg.remove();
  }
  photoHolder.append(img);
};

const addPhotoChangingListener = () => {
  photoInput.addEventListener('change', (evt) => {
    onPhotoChange(evt);
  });
};

const onAvatarChange = (evt) => {
  avatarImage.src = URL.createObjectURL(evt.target.files[0]);
};

const addAvatarChangingListener = () => {
  avatarInput.addEventListener('change', (evt) => {
    onAvatarChange(evt);
  });
};

export {addPhotoChangingListener, addAvatarChangingListener};
