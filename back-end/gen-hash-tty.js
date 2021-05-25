const bcrypt = require('bcryptjs');

console.log(`hash for ${process.argv[2]}:`, bcrypt.hashSync(process.argv[2], bcrypt.genSaltSync()));
