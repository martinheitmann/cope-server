const User = require('../user/model');

function ResolveUser(args) {
    if (args.identifier) {
        console.log('user resolver: calling findUserByIdentifier');
        return User.findUserByIdentifier(args.identifier);
    }
    else {
        console.log('no matching args, returning all users')
        return User.findAllUsers();
    }
}

module.exports = ResolveUser;