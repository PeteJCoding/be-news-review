# Northcoders News API

In order to conenct to the two databases locally you will need to have access to the environment variables.

You can do this by creating two new files for the project: .env.test and .env.development

Into each, add PGDATABASE=, with the correct database name for that environment, which you will find in the setup.sql, then double check that the .env files are .gitignored

Afterwards run npm install.
