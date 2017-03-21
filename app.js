
const profile = require('./profile')
const users = process.argv.slice(2);
users.map(profile.get);
