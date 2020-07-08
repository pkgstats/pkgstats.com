const fonts = `
// IBM Plex Sans
@font-face {
    font-family: 'IBM Plex Sans';
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-ExtraLight.eot');
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-ExtraLight.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-sans/woff/IBMPlexSans-ExtraLight-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-sans/woff2/IBMPlexSans-ExtraLight-Latin1.woff2') format('woff2');
    font-weight: 100;
    font-style: normal;
}

@font-face {
    font-family: 'IBM Plex Sans';
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-ExtraLightItalic.eot');
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-ExtraLightItalic.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-sans/woff/IBMPlexSans-ExtraLightItalic-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-sans/woff2/IBMPlexSans-ExtraLightItalic-Latin1.woff2') format('woff2');
    font-weight: 100;
    font-style: italic;
}

@font-face {
    font-family: 'IBM Plex Sans';
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-Light.eot');
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-Light.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-sans/woff/IBMPlexSans-Light-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-sans/woff2/IBMPlexSans-Light-Latin1.woff2') format('woff2');
    font-weight: 200;
    font-style: normal;
}

@font-face {
    font-family: 'IBM Plex Sans';
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-LightItalic.eot');
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-LightItalic.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-sans/woff/IBMPlexSans-LightItalic-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-sans/woff2/IBMPlexSans-LightItalic-Latin1.woff2') format('woff2');
    font-weight: 200;
    font-style: italic;
}

@font-face {
    font-family: 'IBM Plex Sans';
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-Thin.eot');
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-Thin.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-sans/woff/IBMPlexSans-Thin-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-sans/woff2/IBMPlexSans-Thin-Latin1.woff2') format('woff2');
    font-weight: 300;
    font-style: normal;
}

@font-face {
    font-family: 'IBM Plex Sans';
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-ThinItalic.eot');
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-ThinItalic.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-sans/woff/IBMPlexSans-ThinItalic-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-sans/woff2/IBMPlexSans-ThinItalic-Latin1.woff2') format('woff2');
    font-weight: 300;
    font-style: italic;
}

@font-face {
    font-family: 'IBM Plex Sans';
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-Regular.eot');
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-Regular.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-sans/woff/IBMPlexSans-Regular-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-sans/woff2/IBMPlexSans-Regular-Latin1.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}

@font-face {
    font-family: 'IBM Plex Sans';
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-Italic.eot');
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-Italic.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-sans/woff/IBMPlexSans-Italic-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-sans/woff2/IBMPlexSans-Italic-Latin1.woff2') format('woff2');
    font-weight: 400;
    font-style: italic;
}

@font-face {
    font-family: 'IBM Plex Sans';
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-SemiBold.eot');
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-SemiBold.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-sans/woff/IBMPlexSans-SemiBold-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-sans/woff2/IBMPlexSans-SemiBold-Latin1.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
}

@font-face {
    font-family: 'IBM Plex Sans';
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-SemiBoldItalic.eot');
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-SemiBoldItalic.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-sans/woff/IBMPlexSans-SemiBoldItalic-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-sans/woff2/IBMPlexSans-SemiBoldItalic-Latin1.woff2') format('woff2');
    font-weight: 500;
    font-style: italic;
}

@font-face {
    font-family: 'IBM Plex Sans';
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-SemiBold.eot');
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-SemiBold.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-sans/woff/IBMPlexSans-SemiBold-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-sans/woff2/IBMPlexSans-SemiBold-Latin1.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
}

@font-face {
    font-family: 'IBM Plex Sans';
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-SemiBoldItalic.eot');
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-SemiBoldItalic.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-sans/woff/IBMPlexSans-SemiBoldItalic-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-sans/woff2/IBMPlexSans-SemiBoldItalic-Latin1.woff2') format('woff2');
    font-weight: 600;
    font-style: italic;
}

@font-face {
    font-family: 'IBM Plex Sans';
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-SemiBold.eot');
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-SemiBold.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-sans/woff/IBMPlexSans-SemiBold-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-sans/woff2/IBMPlexSans-SemiBold-Latin1.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}

@font-face {
    font-family: 'IBM Plex Sans';
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-SemiBoldItalic.eot');
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-SemiBoldItalic.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-sans/woff/IBMPlexSans-SemiBoldItalic-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-sans/woff2/IBMPlexSans-SemiBoldItalic-Latin1.woff2') format('woff2');
    font-weight: 700;
    font-style: italic;
}

@font-face {
    font-family: 'IBM Plex Sans';
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-Bold.eot');
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-Bold.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-sans/woff/IBMPlexSans-Bold-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-sans/woff2/IBMPlexSans-Bold-Latin1.woff2') format('woff2');
    font-weight: 800;
    font-style: normal;
}

@font-face {
    font-family: 'IBM Plex Sans';
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-BoldItalic.eot');
    src:    url('/static/fonts/ibm-plex-sans/eot/IBMPlexSans-BoldItalic.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-sans/woff/IBMPlexSans-BoldItalic-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-sans/woff2/IBMPlexSans-BoldItalic-Latin1.woff2') format('woff2');
    font-weight: 800;
    font-style: italic;
}

// IBM Plex Mono
@font-face {
    font-family: 'IBM Plex Mono';
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-ExtraLight.eot');
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-ExtraLight.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-mono/woff/IBMPlexMono-ExtraLight-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-mono/woff2/IBMPlexMono-ExtraLight-Latin1.woff2') format('woff2');
    font-weight: 100;
    font-style: normal;
}

@font-face {
    font-family: 'IBM Plex Mono';
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-ExtraLightItalic.eot');
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-ExtraLightItalic.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-mono/woff/IBMPlexMono-ExtraLightItalic-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-mono/woff2/IBMPlexMono-ExtraLightItalic-Latin1.woff2') format('woff2');
    font-weight: 100;
    font-style: italic;
}

@font-face {
    font-family: 'IBM Plex Mono';
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-Light.eot');
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-Light.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-mono/woff/IBMPlexMono-Light-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-mono/woff2/IBMPlexMono-Light-Latin1.woff2') format('woff2');
    font-weight: 200;
    font-style: normal;
}

@font-face {
    font-family: 'IBM Plex Mono';
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-LightItalic.eot');
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-LightItalic.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-mono/woff/IBMPlexMono-LightItalic-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-mono/woff2/IBMPlexMono-LightItalic-Latin1.woff2') format('woff2');
    font-weight: 200;
    font-style: italic;
}

@font-face {
    font-family: 'IBM Plex Mono';
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-Thin.eot');
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-Thin.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-mono/woff/IBMPlexMono-Thin-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-mono/woff2/IBMPlexMono-Thin-Latin1.woff2') format('woff2');
    font-weight: 300;
    font-style: normal;
}

@font-face {
    font-family: 'IBM Plex Mono';
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-ThinItalic.eot');
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-ThinItalic.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-mono/woff/IBMPlexMono-ThinItalic-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-mono/woff2/IBMPlexMono-ThinItalic-Latin1.woff2') format('woff2');
    font-weight: 300;
    font-style: italic;
}

@font-face {
    font-family: 'IBM Plex Mono';
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-Regular.eot');
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-Regular.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-mono/woff/IBMPlexMono-Regular-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-mono/woff2/IBMPlexMono-Regular-Latin1.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}

@font-face {
    font-family: 'IBM Plex Mono';
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-Italic.eot');
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-Italic.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-mono/woff/IBMPlexMono-Italic-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-mono/woff2/IBMPlexMono-Italic-Latin1.woff2') format('woff2');
    font-weight: 400;
    font-style: italic;
}

@font-face {
    font-family: 'IBM Plex Mono';
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-SemiBold.eot');
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-SemiBold.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-mono/woff/IBMPlexMono-SemiBold-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-mono/woff2/IBMPlexMono-SemiBold-Latin1.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
}

@font-face {
    font-family: 'IBM Plex Mono';
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-SemiBoldItalic.eot');
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-SemiBoldItalic.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-mono/woff/IBMPlexMono-SemiBoldItalic-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-mono/woff2/IBMPlexMono-SemiBoldItalic-Latin1.woff2') format('woff2');
    font-weight: 500;
    font-style: italic;
}

@font-face {
    font-family: 'IBM Plex Mono';
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-SemiBold.eot');
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-SemiBold.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-mono/woff/IBMPlexMono-SemiBold-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-mono/woff2/IBMPlexMono-SemiBold-Latin1.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
}

@font-face {
    font-family: 'IBM Plex Mono';
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-SemiBoldItalic.eot');
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-SemiBoldItalic.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-mono/woff/IBMPlexMono-SemiBoldItalic-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-mono/woff2/IBMPlexMono-SemiBoldItalic-Latin1.woff2') format('woff2');
    font-weight: 600;
    font-style: italic;
}

@font-face {
    font-family: 'IBM Plex Mono';
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-SemiBold.eot');
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-SemiBold.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-mono/woff/IBMPlexMono-SemiBold-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-mono/woff2/IBMPlexMono-SemiBold-Latin1.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}

@font-face {
    font-family: 'IBM Plex Mono';
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-SemiBoldItalic.eot');
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-SemiBoldItalic.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-mono/woff/IBMPlexMono-SemiBoldItalic-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-mono/woff2/IBMPlexMono-SemiBoldItalic-Latin1.woff2') format('woff2');
    font-weight: 700;
    font-style: italic;
}

@font-face {
    font-family: 'IBM Plex Mono';
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-Bold.eot');
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-Bold.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-mono/woff/IBMPlexMono-Bold-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-mono/woff2/IBMPlexMono-Bold-Latin1.woff2') format('woff2');
    font-weight: 800;
    font-style: normal;
}

@font-face {
    font-family: 'IBM Plex Mono';
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-BoldItalic.eot');
    src:    url('/static/fonts/ibm-plex-mono/eot/IBMPlexMono-BoldItalic.eot?#iefix') format('embedded-opentype'),
            url('/static/fonts/ibm-plex-mono/woff/IBMPlexMono-BoldItalic-Latin1.woff') format('woff'),
            url('/static/fonts/ibm-plex-mono/woff2/IBMPlexMono-BoldItalic-Latin1.woff2') format('woff2');
    font-weight: 800;
    font-style: italic;
}
`;

export default fonts;
