const getDatabaseConfig = ({ env }) => {
  if (
    env("IS_OFFLINE", null) === "true" ||
    env("LAMBDA_RUNTIME_DIR", null) === null
  ) {
    // In local simulated Lambda or normal Strapi
    return {
      connector: "bookshelf",
      settings: {
        client: "sqlite",
        filename: env("DATABASE_FILENAME", ".tmp/data.db"),
      },
      options: {
        useNullAsDefault: true,
      },
    };
  } else {
    // In Lambda on AWS
    return {
      connector: "bookshelf",
      settings: {
        client: "sqlite",
        filename: env("DATABASE_FILENAME", "/tmp/data.db"),
      },
      options: {
        useNullAsDefault: true,
      },
    };
  }
};

module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: getDatabaseConfig({ env }),
  },
});
