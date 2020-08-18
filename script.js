const imageContainer=document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded=0;
let totalImages= 0;

// we set let as our photo array will change everytime
let photosArray = [];

// unsplash API we made count and api key const and set it as perameters 
// 30 photos can take a lot of time to download and can lower our website performance
// const count =30; so we will make intialLoad and change it to let 5 and change let count later in code
// let count = 5; it is for reference
// const count = 10;
// const apiKey = 'Jr3cUWeY99TKxtZXPScK-qwMHekPROCoZJj7nuVdnHk';
// const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// Unsplash API
let initialCount = 5;
const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialCount}`;
 
// NEW Block****
function updateAPIURLWithNewCount (picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}
// NEW Block*****
 
 
// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// check if all image were loaded
// function imageLoaded(){
//     imagesLoaded++;
//     if (imagesLoaded === totalImages){
//         ready=true;
//         loader.hidden=true;
//         count=30;
//     }
// }

// helper function to set attribute on DOM
function setAttributes(element,Attributes){
    for (const key in Attributes){
        element.setAttribute(key,Attributes[key]);
    }
}

// create elements for links & photos, Add to DOM
function displayPhotos(){
  imagesLoaded =0;
  totalImages=photosArray.length;
    // get photos for each object in photosArray
    // imageLoaded = 0;
    // totalImages =photosarray.length;
    photosArray.forEach((photo)=>{
        // create <a> to link to unsplash photos
        const item =document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank',
        });
        // create(img)for photo
        const img = document.createElement('img');
        // img.setAttribute('src',photo.urls.item.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);
        setAttributes(img,{
           src:photo.urls.regular,
           alt:photo.alt_description,
           title:photo.alt_description,
         } );
        //  Event Listner, check when each item is loading
        img.addEventListener('load',imageLoaded);
        // put (img)inside(a),then put both inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// get photos from unsplash api
// async function getPhotos(){
//     try{
//         const response= await fetch(apiUrl);
//         photosArray = await response.json();
//         displayPhotos();
//      }
//     catch(error){
//     }
// }
// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    if (isInitialLoad) { // NEW LINE ****
      updateAPIURLWithNewCount(30) // NEW LINE ****
      isInitialLoad = false // NEW LINE ****
    } // NEW LINE ****
  } catch (error) {
    // Catch Error Here
  }
}


// This is to add infinite scroll. we will fetch get phots once again once scroll data is near the bottom of page. 
// check to see if we are scrolling near bottom of page, load more photos

window.addEventListener('scroll',()=>{
if (window.innerHeight+window.scrollY >=document.body.offsetHeight-1000 && ready){
    ready= false;
    getPhotos();
}
});
// on Load
getPhotos();
