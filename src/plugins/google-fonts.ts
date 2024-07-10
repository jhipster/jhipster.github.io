type FontFamily = 'Inter';

type Font = {
  family: FontFamily;
  weight?: string;
};

export default function googleFontsPlugin() {
  return {
    name: 'docusaurus-google-fonts',
    injectHtmlTags() {
      const fonts: Font[] = [{ family: 'Inter', weight: '400..900' }];
      const fontsLink = getFontsLink(fonts);

      return {
        headTags: [
          {
            tagName: 'link',
            attributes: {
              rel: 'preconnect',
              href: 'https://fonts.googleapis.com',
            },
          },
          {
            tagName: 'link',
            attributes: {
              rel: 'preconnect',
              href: 'https://fonts.gstatic.com',
              crossorigin: true,
            },
          },
          fontsLink,
        ],
      };
    },
  };
}

function getFontsLink(fonts: Font[]) {
  const fontsParams = fonts.map((font: Font) => {
    const fontWeight = !font.weight ? '' : `:wght@${font.weight}`;

    return `family=${font.family}${fontWeight}`;
  });

  const fontHref = `https://fonts.googleapis.com/css2?${fontsParams.join('&')}&display=fallback`;

  return {
    tagName: 'link',
    attributes: {
      rel: 'preload',
      href: fontHref,
      as: 'style',
      onload: "this.rel='stylesheet'",
    },
  };
}
