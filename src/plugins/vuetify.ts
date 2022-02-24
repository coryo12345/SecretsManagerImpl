// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

export default createVuetify({
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#00dc82", // emerald
          background: "#2e282a", // raisin black
          error: "#cd5334", // cedar chest
          info: "#0984e3",
          secondary: "feefddff", // antique white
          success: "#a5d8ff", // uranian blue
          surface: "#6c5ce7",
          warning: "#2d3436",
        },
      },
    },
  },
});
