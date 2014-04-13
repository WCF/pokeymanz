var config = {
    appName: 'Geddy App',
    detailedErrors: false,
    hostname: null,
    port: 4000,
    model: {
        defaultAdapter: 'mongo'
    },
    db: {
        mongo: {
            username: null,
            dbname: 'production',
            prefix: null,
            password: null,
            host: 'localhost',
            port: 27017
        }
    }

    /* // Using Postgres as the default, with only a Postgres DB
     , model: {
     defaultAdapter: 'postgres'
     }
     , db: {
     postgres: {
     user: process.env.USER
     , database: process.env.USER
     , password: null
     , host: null
     , port: 5432
     }
     }
     */

    /* // Using MySQL as the default, with only a MySQL DB
     , model: {
     defaultAdapter: 'mysql'
     }
     , db: {
     mysql: {
     host: 'localhost'
     , user: process.env.USER
     , database: process.env.USER
     , password: null
     }
     }
     */

    /* // Using Postgres as the default, with both Postgres and Riak
     , model: {
     defaultAdapter: 'postgres'
     }
     , db: {
     postgres: {
     user: process.env.USER
     , database: process.env.USER
     , password: null
     , host: null
     , port: 5432
     }
     , riak: {
     protocol: 'http'
     , host: 'localhost'
     , port: 8098
     }
     }
     */
};

module.exports = config;


