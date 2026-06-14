import aboutIntroVideo from "../assets/videos/about-intro.mp4";
import aboutThumbnail from "../assets/videos/about-thumbnail.png";
import loadingVideo from "../assets/videos/loading.mp4";

//about page
import aboutHero from "../assets/videos/about-hero.mp4";
import preLoader from "../assets/videos/sumathi-3d-preloader-transparent.webm";

//service page 
import serviceHeroVideo from "../assets/videos/service-hero.mp4";

//projects page 
import projectsHeroVideo from "../assets/videos/projects-hero.mp4";
import projectsFacilityVideo from "../assets/videos/projects-facility.mp4";
import  projectsProcessVideo from "../assets/videos/projects-process.mp4";





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

 projects: {
    hero: projectsHeroVideo,
    facility: projectsFacilityVideo,
    process: projectsProcessVideo
  }

} as const;

export type VideoAssets = typeof videoAssets;