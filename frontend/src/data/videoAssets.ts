import aboutIntroVideo from "../assets/videos/about-intro.mp4";
import aboutThumbnail from "../assets/videos/about-thumbnail.png";
import loadingVideo from "../assets/videos/loading.mp4";

export const videoAssets = {
  about: {
    intro: aboutIntroVideo,
    thumbnail: aboutThumbnail,
  },

  loading:{
    intro: loadingVideo,
  },
} as const;

export type VideoAssets = typeof videoAssets;