const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      // Puedes añadir otros fallbacks aquí si es necesario
    }
  },
  // Puedes añadir otras configuraciones personalizadas aquí
};
