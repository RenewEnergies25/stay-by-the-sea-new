import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  titleTemplate: '%s | Stay by the Sea – Blackpool',
  defaultTitle: 'Stay by the Sea – Blackpool | Luxury Holiday Rental for 14 Guests',
  description: 'Luxury seaside accommodation for up to 14 guests in Blackpool. 7 double beds, air con, private parking, near Pleasure Beach. Book your perfect coastal getaway.',
  canonical: process.env.NEXT_PUBLIC_PROPERTY_URL,
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: process.env.NEXT_PUBLIC_PROPERTY_URL,
    siteName: 'Stay by the Sea – Blackpool',
    title: 'Stay by the Sea – Blackpool | Luxury Holiday Rental',
    description: 'Luxury seaside accommodation for up to 14 guests in Blackpool. 7 double beds, air con, private parking, near Pleasure Beach.',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_PROPERTY_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Stay by the Sea - Luxury Holiday Rental in Blackpool',
      },
    ],
  },
  twitter: {
    handle: '@staybythesea',
    site: '@staybythesea',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#0D1B2A',
    },
    {
      httpEquiv: 'x-ua-compatible',
      content: 'IE=edge',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
  ],
};

export default config;