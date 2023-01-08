const photoInput = document.querySelector('#images');
const photoHolder = document.querySelector('.ad-form__photo');

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

export {addPhotoChangingListener};
