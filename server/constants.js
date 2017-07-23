const ENABLE_EDITION = [
  '1', 'yes', 'enable', 'y', 'true'
].indexOf((process.env.ENABLE_EDITION || '').toLowerCase()) >= 0;

module.exports = {
  ENABLE_EDITION,
};
