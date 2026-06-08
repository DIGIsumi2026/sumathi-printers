//navigation bar 
import sumathiLogo from "../assets/images/logo/sumathi-logo.png";

//hero section 
import offsetPrinting from "../assets/images/hero-section/offset-printing.png";
import graphicDesigning from "../assets/images/hero-section/graphic-designing.png";
import packagingBoxPrinting from "../assets/images/hero-section/packaging-box-printing.png";
import booksMagazinesBrochures from "../assets/images/hero-section/books-magazines-brochures.png";
import cap from "../assets/images/hero-section/cap.png";









export const imageAssets = {
  logo: {
    main: sumathiLogo
  },

  hero: {
    offsetPrinting,
    graphicDesigning,
    packagingBoxPrinting,
    booksMagazinesBrochures,
    cap,
  },







} as const

export type ImageAssets = typeof imageAssets;
export type HeroImageKey = keyof typeof imageAssets.hero;
