import { useEffect, useRef } from "react";
import { videoAssets } from "../../data/videoAssets";

type PreloaderProps = {
  visible: boolean;
  brand?: string;
};

export default function Preloader({ visible }: PreloaderProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (visible) {
      video.currentTime = 0;

      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
    }
  }, [visible]);

  return (
    <div className={`sp-page-loader ${visible ? "is-visible" : "is-hidden"}`}>
      <div className="sp-page-loader-bg" />

      <div className="sp-page-loader-video-wrap">
        <video
          ref={videoRef}
          className="sp-page-loader-video"
          src={videoAssets.loading.intro}
          muted
          playsInline
          autoPlay
          preload="auto"
        />
      </div>

      <div className="sp-page-loader-bottom">
        <span className="sp-loader-line" />
        <span className="sp-loader-text">Loading Experience</span>
      </div>
    </div>
  );
}