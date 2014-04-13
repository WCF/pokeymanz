var config = {
    appName: 'Geddy App (development)',
    detailedErrors: true,
    debug: true,
    hostname: null,
    port: 4000,
    model: {
        defaultAdapter: 'mongo'
    },
    db: {
        // geddy jake db:init environment=development
        mongo: {
            username: null,
            dbname: 'development',
            prefix: null,
            password: null,
            host: 'localhost',
            port: 27017
        }
    },
    sessions: {
        store: 'filesystem',
        filename: '_session_store.json',
        key: 'sid',
        expiry: 14 * 24 * 60 * 60
    }
};

module.exports = config;
