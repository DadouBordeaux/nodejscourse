const environements = {};

environements.stagin = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: 'stagin'
}

environements.production = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: 'production'
}

// set to stagin defaut environements if undefined

const currentEnvironement = typeof(process.env.NODE_ENV) === 'string'
  ? process.env.NODE_ENV.toLowerCase()
  : '';

environementToExport = typeof(environements[currentEnvironement]) === 'object'
  ? environements[currentEnvironement]
  : environements.stagin;

module.exports = environementToExport;
