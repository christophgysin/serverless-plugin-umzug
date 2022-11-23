# Umzug Plugin for Serverless

Plugin for the serverless framework to run DynamoDB migrations using umzug.

## Installation

  npm install --save serverless-plugin-umzug

## Configuration

Enable the plugin:

```yml
plugins:
 - serverless-plugin-umzug
```

By default, the plugin will create a DynamoDB table called `migrations`. This
can be overidden by providing a custom configuration:

```yml
custom:
  umzug:
    tablename: my-migrations-table
```

## Usage

## List pending migrations

```sh
$ serverless migrations pending
No pending migrations
```

## Create a new migration

Create a new file under `migrations/` with a timestamp prefix, e.g.:

`migrations/2019-06-05-15-39-04-dummy-migration.js`

```javascript
module.exports = {
  up: function () {
    // Describe how to achieve the task.
    return Promise.resolve();
  },

  down: function () {
    // Describe how to revert the task.
    return Promise.resolve();
  },
};
```

```sh
$ serverless migrations pending
Pending migrations
--------------------------------------
2019-06-05-15-39-04-dummy-migration.js
```

## Run pending migrations

```sh
$ serverless migrations up
..
Executed 'up' of 1 migrations
--------------------------------------
2019-06-05-15-39-04-dummy-migration.js
```

## Show migration history

```sh
$ serverless migrations history
Executed migrations
--------------------------------------
2019-06-05-15-39-04-dummy-migration.js
```

## Migrate one migrations down

```sh
$ serverless migrations down
...
Executed 'down' of 1 migrations
--------------------------------------
2019-06-05-15-39-04-dummy-migration.js
```
