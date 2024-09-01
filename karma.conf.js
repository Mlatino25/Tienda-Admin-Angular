// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  const isCI = process.env.CI === 'true'; // Detecta si está en un entorno de CI/CD

  config.set({
    // Base path for resolving files and excluding patterns
    basePath: '',

    // Frameworks to use
    frameworks: ['jasmine', '@angular-devkit/build-angular'],

    // List of plugins to load
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],

    // List of browsers to launch
    // En CI/CD, usa ChromeHeadless; en desarrollo, usa Chrome
    browsers: isCI ? ['ChromeHeadless'] : ['Chrome'],

    // Additional configuration for ChromeHeadless
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu']
      }
    },

    // Reporting options
    reporters: ['progress', 'kjhtml'],

    // Configuration for code coverage reporting
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/mantis-free-version'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },

    // Configure client options
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },

    // Misc settings
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,

    // Configuración automática según el entorno
    autoWatch: !isCI, // Habilita autoWatch en desarrollo, desactívalo en CI/CD
    singleRun: isCI,  // Ejecuta las pruebas una sola vez en CI/CD, mantén Karma en ejecución en desarrollo
    restartOnFileChange: !isCI // Habilita el reinicio automático de pruebas en desarrollo, desactívalo en CI/CD
  });
};
