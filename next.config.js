const path = require("path")

module.exports = {
    i18n: {
        locales: ['UK', 'EN','RU'],
        defaultLocale: 'UK'
    },
    env: {
        FROM_USER_LOGIN:"osvitniisitekyiv@gmail.com",
        FROM_USER_PASSWORD:"osvitniisitekyiv12345",
        TO_USER_LOGIN:"rzozyla@gmail.com",
        WP_NEXT_PUBLIC_URL:"https://testkp.flexreality.pro/graphql",
        WP_USER_LOGIN:'admin',
        WP_USER_PASSWORD:'2wsx@WSX',
        WP_CLIENT_MUTATION_ID:'dXNlcjox'
    },
    webpackDevMiddleware: (config) => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        };

        return config;
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
};

