/* eslint-disable global-require */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      m360: { max: '360px' },
      m768: '768px',
      m1024: '1024px',
      m1280: '1280px',
      m1366: '1366px',
      m1440: '1440px',
      m1600: '1600px',
      m1920: '1920px',
      m2560: '2560px',
    },
    extend: {},
  },
  plugins: [require('daisyui')],
};
