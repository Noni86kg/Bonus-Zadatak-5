const imageContainer = document.getElementById('image-container');
const grid = document.querySelector(".grid");
const list = document.querySelector(".list");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 30;
const apiKey = 'sKsS-XhQlQXt5HWfo02fvokD299VpqfTTSW-elPdT_k';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


function imageLoaded() {

    imagesLoaded++;
    if (imagesLoaded === totalImages) {
      ready = true;
      loader.hidden = true;
    }
  }


function setAttributes(element, attributes) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
      console.log(photo)
      const div = document.createElement('div');
      div.classList.add('card');

        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
          });
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
          });
          const textHTML = document.createElement('div');
          textHTML.classList.add('text');
          const cardText = `    
          <h2>${photo.alt_description ? photo.alt_description : ''}</h2>
          <h4>${photo.user.username ? "Photography by" + photo.user.username  : ''}</h4>
          <p>${photo.exif.make ? photo.exif.make : ""} ${photo.exif.model ? photo.exif.model : ""}<br>
          ${photo.location.title ? "Location:" + photo.location.title : ''} </p>`;
          textHTML.innerHTML = cardText;

          img.addEventListener('load', imageLoaded);
          item.appendChild(img);
          div.appendChild(item);
          div.appendChild(textHTML);
          imageContainer.appendChild(div);
    })
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

    }   catch (error) {

    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
      }
})

getPhotos();

//Grid / list mode
list.addEventListener('click', ()=> {
    imageContainer.classList.remove('active');
    grid.style.color = "gray";
    list.style.color = "white";
})
grid.addEventListener('click', ()=> {
    imageContainer.classList.add('active');
    grid.style.color = "white";
    list.style.color = "gray";
})