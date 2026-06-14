export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface Seo {
  title: string;
  description: string;
}

export interface Hero {
  _type: 'hero';
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaUrl: string;
  image?: SanityImage;
}

export interface Feature {
  _type: 'feature';
  _key: string;
  title: string;
  description: string;
}

export interface FeaturesSection {
  _type: 'featuresSection';
  heading: string;
  features: Feature[];
}

export interface CtaSection {
  _type: 'ctaSection';
  heading: string;
  description: string;
  ctaLabel: string;
  ctaUrl: string;
}

export interface HomePage {
  _type: 'homePage';
  _id: string;
  title: string;
  seo: Seo;
  hero: Hero;
  featuresSection: FeaturesSection;
  ctaSection: CtaSection;
}

export interface SiteSettings {
  _type: 'siteSettings';
  _id: string;
  siteName: string;
  logo?: SanityImage;
  footerText: string;
  navigation: NavigationItem[];
}

export interface NavigationItem {
  _type: 'navigationItem';
  _key: string;
  label: string;
  url: string;
}
