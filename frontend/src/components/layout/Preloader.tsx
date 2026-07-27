import { useEffect, useRef } from "react";
import { videoAssets } from "../../data/videoAssets";
import { imageAssets } from "../../data/imageAssets";
import { useMediaPlaybackPolicy } from "../../hooks/useMediaPlaybackPolicy";

type PreloaderProps = {
  visible: boolean;
};

export default function Preloader({ visible }: PreloaderProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { shouldAnimateHeavy } = useMediaPlaybackPolicy();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (visible) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [visible]);

  return (
    <div className={`sp-page-loader ${visible ? "is-visible" : "is-hidden"}`}>
      <div className="sp-page-loader-glass" />

      {shouldAnimateHeavy ? (
        <video
          ref={videoRef}
          className="sp-page-loader-video"
          src={videoAssets.loading.introPre}
          muted
          playsInline
          autoPlay={visible}
          preload="metadata"
        />
      ) : (
        <img
          className="sp-page-loader-video sp-page-loader-logo"
          src={imageAssets.logo.main}
          alt="Sumathi Printers"
          draggable={false}
          decoding="async"
        />
      )}
    </div>
  );
}
