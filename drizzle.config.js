/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://protomock_owner:1XT3UDYsrRSb@ep-fragrant-leaf-a5xbgz1f.us-east-2.aws.neon.tech/protomock?sslmode=require",
    }
  };