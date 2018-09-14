var API_VERSION = ['api', 'api-test'],
    CONFIG_MONGO = {
        // __MONGO_LINK: 'mongodb://admin:admin@ds155218.mlab.com:55218/cinema'
        __MONGO_LINK: 'mongodb://localhost/cinema'
    },

    CONFIG_API = {
        // API Security
        __API_AUTHOR: 'Nguyen Thanh Thien 658JJH',
        __API_KEY: 'wx0z34ajQVSm5xdhZa7ygStlAbRVnfNC',
        __API_SECRET: 'iP]Y@!_zPnxvKgy;C58#z=}D9YzS(Z',

        // Link API
        __link_user: '/user/', // USER
        __link_user_login: '/login/',
        __link_film: +'/film/',
        __link_category: API_VERSION[0] + '/category/',

        // Link Admin
        __link_admin: '/admin',
        __link_admin_2: '/adminm',

        // Link reset password
        __link_reset_password: '/auth/reset-password/?access_token=',
        __route_reset_password: '/auth/reset-password',

        // MongoDB Config
        __database_name: 'cinema',
        __admin_name: 'admin',
        __admin_password: 'admin',

        // Port app server
        __port_server: 3000, // 80 if public to IP address

    }

exports.CONFIG_MONGO = CONFIG_MONGO
exports.CONFIG_API = CONFIG_API