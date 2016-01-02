'use strict';

const config = {
  credentialStore: require(__dirname + '/store.example.json')
};

let log = console;

function userAttributes(userid) {
  const user = config.credentialStore[userid];
  return Promise.resolve({
    extraAttributes: {
      firstName: user.firstName,
      lastName: user.lastName
    }
  });
}

function validate(username, password) {
  function promise(resolve, reject) {

    if (!config.credentialStore.hasOwnProperty(username)) {
      log.debug('username not in credential store: %s', username);
      return reject(false);
    }

    const valid = (config.credentialStore[username].password === password);
    log.debug('credential validation result: %s', valid);
    return (valid) ? resolve(valid) : reject(valid);
  }

  return new Promise(promise);
}

module.exports.name = 'authJSON';
module.exports.plugin = function plugin(options, context) {
  log = context.logger || log;
  if (options && options.credentialStore) {
    config.credentialStore = require(options.credentialStore);
  }
  return {validate};
};

module.exports.postInit = function postInit(context) {
  return Promise.resolve({
    hooks: {userAttributes}
  });
};
