const path = require('path');

module.exports = {
    webpack: (config, webpack) => {
      // Note: we provide webpack above so you should not `require` it
      // Perform customizations to webpack config
      // Important: return the modified config
      const a = path.join(__dirname, 'src', 'custom.js');
      config.entry = [config.entry, a];
  
      return config;
    },
  };