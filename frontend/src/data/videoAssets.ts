import aboutIntroVideo from "../assets/videos/about-intro.mp4";

export const videoAssets = {
  about: {
    intro: aboutIntroVideo
  }
} as const;

export type VideoAssets = typeof videoAssets;