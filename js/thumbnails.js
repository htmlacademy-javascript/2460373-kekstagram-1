const thumbnailContainerElement = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const getThumbnail = ({ id, url, description, likes, comments }) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);
  const thumbnailImg = thumbnailElement.querySelector('.picture__img');

  thumbnailImg.src = url;
  thumbnailImg.alt = description;
  thumbnailElement.dataset.thumbnailId = id;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;

  return thumbnailElement;
};

const deleteThumbnails = () => {
  const pictureElements = thumbnailContainerElement.querySelectorAll('.picture');
  pictureElements.forEach((element) => {
    element.remove();
  });
};

const renderThumbnails = (photos) => {
  deleteThumbnails();

  const thumbnailsFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    thumbnailsFragment.append(getThumbnail(photo));
  }
  );

  thumbnailContainerElement.append(thumbnailsFragment);
};

export { renderThumbnails, thumbnailContainerElement };

