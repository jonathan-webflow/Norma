import type { HomePage, SiteSettings } from '../types/sanity.types';
// import { sanityClient } from './client';
// import { HOME_PAGE_QUERY, SITE_SETTINGS_QUERY } from './queries';

const mockHomePage: HomePage = {
  _type: 'homePage',
  _id: 'home-page-mock',
  title: 'Norma',
  seo: {
    title: 'Norma — Página Inicial',
    description:
      'Wireframe inicial do projeto Norma. Conteúdo mockado até integração com Sanity CMS.',
  },
  hero: {
    _type: 'hero',
    title: 'Construindo experiências digitais escaláveis',
    subtitle:
      'Estrutura base pronta para receber o design final e conteúdo gerenciado via Sanity CMS.',
    ctaLabel: 'Saiba mais',
    ctaUrl: '#features',
  },
  featuresSection: {
    _type: 'featuresSection',
    heading: 'Recursos principais',
    features: [
      {
        _type: 'feature',
        _key: 'feature-1',
        title: 'Arquitetura modular',
        description: 'Componentes organizados por responsabilidade: UI, layout e seções.',
      },
      {
        _type: 'feature',
        _key: 'feature-2',
        title: 'Integração Sanity',
        description: 'Camada de serviços abstraída com mocks prontos para troca por GROQ real.',
      },
      {
        _type: 'feature',
        _key: 'feature-3',
        title: 'Design system preparado',
        description: 'Tokens de cor e tipografia via variáveis CSS no Tailwind.',
      },
    ],
  },
  ctaSection: {
    _type: 'ctaSection',
    heading: 'Pronto para evoluir',
    description: 'Substitua os mocks por queries reais assim que o Sanity estiver configurado.',
    ctaLabel: 'Entre em contato',
    ctaUrl: '#contact',
  },
};

const mockSiteSettings: SiteSettings = {
  _type: 'siteSettings',
  _id: 'site-settings-mock',
  siteName: 'Norma',
  footerText: '© 2026 Norma. Todos os direitos reservados.',
  navigation: [
    { _type: 'navigationItem', _key: 'nav-1', label: 'Início', url: '/' },
    { _type: 'navigationItem', _key: 'nav-2', label: 'Recursos', url: '#features' },
    { _type: 'navigationItem', _key: 'nav-3', label: 'Contato', url: '#contact' },
  ],
};

export async function getHomePageData(): Promise<HomePage> {
  // return sanityClient.fetch<HomePage>(HOME_PAGE_QUERY);
  return mockHomePage;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  // return sanityClient.fetch<SiteSettings>(SITE_SETTINGS_QUERY);
  return mockSiteSettings;
}
