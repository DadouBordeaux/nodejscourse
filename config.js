const environements = {};

environements.stagin = {
  port: 3000,
  envName: 'stagin'
}

environements.production = {
  port: 5000,
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
