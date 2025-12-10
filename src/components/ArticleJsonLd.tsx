export function ArticleJsonLd({
  title,
  description,
  publishedTime,
  modifiedTime,
  url,
  image,
}: {
  title: string;
  description: string;
  publishedTime?: string;
  modifiedTime?: string;
  url: string;
  image?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: image ? [image] : undefined,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      "@type": "Organization",
      name: "24bitColors Team",
      url: "https://24bitcolors.com",
    },
    publisher: {
      "@type": "Organization",
      name: "24bitColors",
      logo: {
        "@type": "ImageObject",
        url: "https://24bitcolors.com/icon",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
