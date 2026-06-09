//navigation bar 
import sumathiLogo from "../assets/images/logo/sumathi-logo.png";

//loading animation 


//hero section 
import offsetPrinting from "../assets/images/hero-section/offset-printing.png";
import graphicDesigning from "../assets/images/hero-section/graphic-designing.png";
import packagingBoxPrinting from "../assets/images/hero-section/packaging-box-printing-h.png";
import booksMagazinesBrochures from "../assets/images/hero-section/books-magazines-brochures.png";
import cap from "../assets/images/hero-section/cap.png";

//hero-product section 
import flyersLeaflets from  "../assets/images/hero-section/service-gallery/flyers-leaflets.png";
import postersBanners from  "../assets/images/hero-section/service-gallery/posters-banners.png";
import billBooksLetterheads from  "../assets/images/hero-section/service-gallery/bill-books-letterheads.png";
import calendarsDiaries from  "../assets/images/hero-section/service-gallery/calendars-diaries.png";
import letterheadsEnvelopes from  "../assets/images/hero-section/service-gallery/letterheads-envelopes.png";
import certificatesPrinting from  "../assets/images/hero-section/service-gallery/certificates-printing.png";
import stickersLabels from  "../assets/images/hero-section/service-gallery/stickers-labels.png";
import packagingBoxPrintingGallery from  "../assets/images/hero-section/service-gallery/packaging-box-printing.png";
import brochuresCatalogs from  "../assets/images/hero-section/service-gallery/brochures-catalogs.png";
import booksMagazinesPrinting from  "../assets/images/hero-section/service-gallery/books-magazines-printing.png";

//hero-technology 
import technologyPrinting from "../assets/images/hero-section/technology/printing-machinery.png";
import technologyBinding from "../assets/images/hero-section/technology/binding-machinery.png";
import technologyPackaging from "../assets/images/hero-section/technology/packaging-machinery.png";
import technologyFinishing from "../assets/images/hero-section/technology/finishing-machinery.png";












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

  serviceGallery: {
  flyersLeaflets,
  postersBanners,
  billBooksLetterheads,
  calendarsDiaries,
  letterheadsEnvelopes,
  certificatesPrinting,
  stickersLabels,
  packagingBoxPrinting: packagingBoxPrintingGallery,
  brochuresCatalogs,
  booksMagazinesPrinting
},

technology: {
  printing: technologyPrinting,
  binding: technologyBinding,
  packaging: technologyPackaging,
  finishing: technologyFinishing
}







} as const

export type ImageAssets = typeof imageAssets;
export type HeroImageKey = keyof typeof imageAssets.hero;
