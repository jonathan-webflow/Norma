export const HOME_PAGE_QUERY = /* groq */ `
  *[_type == "homePage"][0] {
    _id,
    _type,
    title,
    seo {
      title,
      description
    },
    hero {
      _type,
      title,
      subtitle,
      ctaLabel,
      ctaUrl,
      image {
        _type,
        asset,
        alt
      }
    },
    featuresSection {
      _type,
      heading,
      features[] {
        _type,
        _key,
        title,
        description
      }
    },
    ctaSection {
      _type,
      heading,
      description,
      ctaLabel,
      ctaUrl
    }
  }
`;

export const SITE_SETTINGS_QUERY = /* groq */ `
  *[_type == "siteSettings"][0] {
    _id,
    _type,
    siteName,
    logo {
      _type,
      asset,
      alt
    },
    footerText,
    navigation[] {
      _type,
      _key,
      label,
      url
    }
  }
`;
