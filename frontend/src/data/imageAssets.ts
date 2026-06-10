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

//hero clients 
import clientLogo01 from "../assets/images/hero-section/clients/ministry-health.png";
import clientLogo02 from "../assets/images/hero-section/clients/rupawahini.png";
import clientLogo03 from "../assets/images/hero-section/clients/family-health.png";
import clientLogo04 from "../assets/images/hero-section/clients/heath-promotion.png";
import clientLogo05 from "../assets/images/hero-section/clients/bcc.png";
import clientLogo06 from "../assets/images/hero-section/clients/japura.png";
import clientLogo07 from "../assets/images/hero-section/clients/colombo.png";
import clientLogo08 from "../assets/images/hero-section/clients/NAITA.png";
import clientLogo09 from "../assets/images/hero-section/clients/revenue-department.png";
import clientLogo10 from "../assets/images/hero-section/clients/RDB.png";
import clientLogo11 from "../assets/images/hero-section/clients/sri-lanka-insurance.png";
import clientLogo12 from "../assets/images/hero-section/clients/NSB.png";
import clientLogo13 from "../assets/images/hero-section/clients/national-water-suply.png";
import clientLogo14 from "../assets/images/hero-section/clients/colombo-text.png";
import clientLogo15 from "../assets/images/hero-section/clients/national-cancer.png";

//hero-projects
import projectSchoolBooks from "../assets/images/hero-section/projects/school-books-printing.png";
import projectHealthCards from "../assets/images/hero-section/projects/health-cards-printing.png";
import projectExamPapers from "../assets/images/hero-section/projects/exam-papers-printing.png";
import projectLeaflets from "../assets/images/hero-section/projects/leaflets-printing.png";
import projectTshirtPrinting from "../assets/images/hero-section/projects/tshirt-printing.png";

//about us page 
//hero
import aboutIntroThumbnail from "../assets/images/about/about-intro-thumbnail.png";

//about-story
import aboutStoryImage from "../assets/images/about/about-story.png";

//visiion, mission 
import visionImage from "../assets/images/about/vision.png";
import missionImage from "../assets/images/about/mission.png";

//board management
import boardThilanga from "../assets/images/about/board/thilanga-sumathipala.png";
import boardSamadara from "../assets/images/about/board/samadara-sumathipala.png";
import boardDulantha from "../assets/images/about/board/dulantha-sumathipala.png";
import boardSajantha from "../assets/images/about/board/sajantha-sumathipala.png";











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
}, 

clients: {
  client01: clientLogo01,
  client02: clientLogo02,
  client03: clientLogo03,
  client04: clientLogo04,
  client05: clientLogo05,
  client06: clientLogo06,
  client07: clientLogo07,
  client08: clientLogo08,
  client09: clientLogo09,
  client10: clientLogo10,
  client11: clientLogo11,
  client12: clientLogo12,
  client13: clientLogo13,
  client14: clientLogo14,
  client15: clientLogo15
},

projects: {
  schoolBooks: projectSchoolBooks,
  healthCards: projectHealthCards,
  examPapers: projectExamPapers,
  leaflets: projectLeaflets,
  tshirtPrinting: projectTshirtPrinting
},

about: {
  thumbnail: aboutIntroThumbnail,
  story: aboutStoryImage,
  vision: visionImage,
  mission: missionImage,
},

board: {
  thilanga: boardThilanga,
  samadara: boardSamadara,
  dulantha: boardDulantha,
  sajantha: boardSajantha
},








} as const

export type ImageAssets = typeof imageAssets;
export type HeroImageKey = keyof typeof imageAssets.hero;
