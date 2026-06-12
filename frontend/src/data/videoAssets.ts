import aboutIntroVideo from "../assets/videos/about-intro.mp4";
import aboutThumbnail from "../assets/videos/about-thumbnail.png";
import loadingVideo from "../assets/videos/loading.mp4";

//about page
import aboutHero from "../assets/videos/about-hero.mp4";
import preLoader from "../assets/videos/sumathi-3d-preloader-transparent.webm";

//service page 
import serviceHeroVideo from "../assets/videos/service-hero.mp4";




export const videoAssets = {
  about: {
    intro: aboutIntroVideo,
    thumbnail: aboutThumbnail,
  },

  loading:{
    intro: loadingVideo,
    introPre: preLoader,
  },

  aboutHero:{
    intro: aboutHero
  },

services:{
  hero: serviceHeroVideo
},

} as const;

export type VideoAssets = typeof videoAssets;