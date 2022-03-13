// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Vuetify
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi';

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#00dc82', // emerald
          background: '#2e282a', // raisin black
          error: '#cd5334', // cedar chest
          info: '#0984e3',
          secondary: '#feefdd', // antique white
          success: '#a5d8ff', // uranian blue
          surface: '#feefdd', //'#6c5ce7',
          warning: '#2d3436',
        },
      },
    },
  },
});
