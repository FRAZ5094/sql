const express = require("express");
const { postgraphile } = require("postgraphile");
const cors = require("cors");
const app = express();
require("dotenv").config();

const postgraphileOptions = {
  subscriptions: true,
  watchPg: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  ignoreIndexes: false,
  showErrorStack: "json",
  extendedErrors: ["hint", "detail", "errcode"],
  appendPlugins: [require("@graphile-contrib/pg-simplify-inflector")],
  exportGqlSchemaPath: "schema.graphql",
  graphiql: true,
  enhanceGraphiql: true,
  allowExplain(req) {
    // TODO: customise condition!
    return true;
  },
  enableQueryBatching: true,
  legacyRelations: "omit",
  pgSettings(req) {
    /* TODO */
  },
  ownerConnectionString: process.env.DATABASE_URL,
};

app.use(cors());
app.use(postgraphile(process.env.DATABASE_URL, postgraphileOptions));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Running on localhost:${port}/graphiql`));
