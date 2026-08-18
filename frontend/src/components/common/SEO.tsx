import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.sumathiprinters.lk";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const SITE_NAME = "Sumathi Printers";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  keywords?: string;
  /** JSON-LD structured data – single object or array */
  structuredData?: object | object[];
}

export default function SEO({
  title = "Sumathi Printers | Professional Printing Solutions in Sri Lanka",
  description = "Sumathi Printers provides high-quality printing services including offset printing, packaging, books, brochures, business stationery, promotional materials, and custom print solutions in Sri Lanka.",
  canonical = SITE_URL,
  image = DEFAULT_OG_IMAGE,
  keywords = "printing services Sri Lanka, offset printing, book printing, brochure printing, packaging printing, promotional materials, Sumathi Printers, professional printing",
  structuredData,
}: SEOProps) {
  const schemas = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Helmet>
      {/* Primary Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={SITE_NAME} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_LK" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:alt" content={`${SITE_NAME} - Professional Printing Solutions`} />

      {/* Twitter / X Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${SITE_NAME} - Professional Printing Solutions`} />

      {/* JSON-LD structured data */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}