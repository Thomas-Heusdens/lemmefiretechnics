import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
}

export default function SEO({ title, description, image, type = 'website' }: SEOProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.split('-')[0]; // 'fr' or 'nl'
  
  // ⚠️ CHANGE THIS to your real domain when you buy it
  const siteUrl = 'https://lemmefiretechnics.vercel.app/'; 
  const siteName = 'Lemme Fire Technics';
  
  // Logic: Only add suffix if the title is NOT the site name
  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;

  // Default image if a specific page doesn't have one
  const metaImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/og-default.jpg`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Lemme Fire Technics",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "description": "Formation et éducation professionnelles à la sécurité incendie.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+32-456-789-012",
      "contactType": "customer service"
    }
  };

  return (
    <Helmet>
      {/* 1. Dynamic HTML Attributes */}
      <html lang={currentLang} />
      
      {/* 2. Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#dc2626" />
      <link rel="canonical" href={window.location.href} />

      {/* 3. Open Graph (Facebook, LinkedIn, WhatsApp) */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:locale" content={currentLang === 'fr' ? 'fr_BE' : 'nl_BE'} />

      {/* 4. Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={metaImage} />

      {/* 5. JSON-LD Schema Script */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
}