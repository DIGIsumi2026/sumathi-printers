import { imageAssets } from "../../../data/imageAssets";

export type GalleryCategory =
  | "All"
  | "Packaging & Boxes"
  | "Books & Magazines"
  | "Corporate Stationery"
  | "Promotional & Commercial"
  | "Specialty Finishes";

export type GalleryItem = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  categories: Exclude<GalleryCategory, "All">[];
  size: "tall" | "wide" | "normal";
};

export const galleryFilters: GalleryCategory[] = [
  "All",
  "Packaging & Boxes",
  "Books & Magazines",
  "Corporate Stationery",
  "Promotional & Commercial",
  "Specialty Finishes"
];

export const galleryItems: GalleryItem[] = [
  {
    id: "corporate-publications",
    title: "Corporate Publications",
    subtitle: "Perfect Binding · Hard Case · Wire Binding",
    image: imageAssets.gallery.corporatePublications,
    categories: ["Books & Magazines"],
    size: "tall"
  },
  {
    id: "precision-printing",
    title: "Precision Printing",
    subtitle: "Offset Printing · Color Accuracy · Quality Control",
    image: imageAssets.gallery.precisionPrinting,
    categories: ["Books & Magazines", "Promotional & Commercial"],
    size: "normal"
  },
  {
    id: "packaging-solutions",
    title: "Packaging Solutions",
    subtitle: "Matte Lamination · UV Varnish · Die Cutting",
    image: imageAssets.gallery.packagingSolutions,
    categories: ["Packaging & Boxes"],
    size: "tall"
  },
  {
    id: "premium-box-finishing",
    title: "Premium Box Finishing",
    subtitle: "Foiling · Lamination · Precision Cutting",
    image: imageAssets.gallery.packagingDetail,
    categories: ["Packaging & Boxes", "Specialty Finishes"],
    size: "normal"
  },
  {
    id: "marketing-collateral",
    title: "Marketing Collateral",
    subtitle: "Brochures · Flyers · Posters",
    image: imageAssets.gallery.marketingCollateral,
    categories: ["Promotional & Commercial"],
    size: "tall"
  },
  {
    id: "collaborative-review",
    title: "Collaborative Review",
    subtitle: "Consultation · Proofing · Project Review",
    image: imageAssets.gallery.collaborationReview,
    categories: ["Promotional & Commercial"],
    size: "wide"
  },
  {
    id: "secure-official-printing",
    title: "Secure & Official Printing",
    subtitle: "Gold Foiling · Numbering · Official Stationery",
    image: imageAssets.gallery.secureOfficial,
    categories: ["Corporate Stationery", "Specialty Finishes"],
    size: "normal"
  },
  {
    id: "finishing-excellence",
    title: "Finishing Excellence",
    subtitle: "Binding · Trimming · Lamination",
    image: imageAssets.gallery.finishingExcellence,
    categories: ["Specialty Finishes"],
    size: "tall"
  },
  {
    id: "public-sector-printing",
    title: "Public Sector Printing",
    subtitle: "High-Volume · Secure Handling · Official Records",
    image: imageAssets.gallery.publicSector,
    categories: ["Corporate Stationery", "Books & Magazines"],
    size: "wide"
  },
  {
    id: "structural-packaging",
    title: "Structural Packaging",
    subtitle: "Die-Cut · Matte Lamination · UV Detail",
    image: imageAssets.gallery.structuralPackaging,
    categories: ["Packaging & Boxes", "Specialty Finishes"],
    size: "normal"
  },
  {
    id: "academic-corporate",
    title: "Academic & Corporate Publishing",
    subtitle: "Hardbound Books · Diaries · Metallic Foiling",
    image: imageAssets.gallery.academicCorporate,
    categories: ["Books & Magazines", "Specialty Finishes"],
    size: "wide"
  }
];