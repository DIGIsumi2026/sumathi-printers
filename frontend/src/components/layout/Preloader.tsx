import { useEffect, useRef } from "react";
import { videoAssets } from "../../data/videoAssets";

type PreloaderProps = {
  visible: boolean;
};

export default function Preloader({ visible }: PreloaderProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

      <video
        ref={videoRef}
        className="sp-page-loader-video"
        src={videoAssets.loading.introPre}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
      />
    </div>
  );
}