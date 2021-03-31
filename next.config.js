const path = require("path");

module.exports = {
  i18n: {
    locales: ["UK", "EN", "RU"],
    defaultLocale: "UK",
  },
  env: {
    FROM_USER_LOGIN: "osvitniisitekyiv@gmail.com",
    FROM_USER_PASSWORD: "osvitniisitekyiv12345",
    TO_USER_LOGIN: "Rk@flexreality.pro",
    WP_NEXT_PUBLIC_URL: "https://testkp.flexreality.pro/graphql",
    WP_USER_LOGIN: "user",
    WP_USER_PASSWORD: "kvDNklN#oIJ%TV11(IIDnRBI",
    WP_CLIENT_MUTATION_ID: "dXNlcjo3",
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
