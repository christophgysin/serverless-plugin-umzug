const AWS = require('aws-sdk')
const UmzugCli = require('umzug-cli');

class ServerlessUmzug {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.config = (this.serverless.service.custom || {}).umzug || {};

    this.commands = {
      migrations: {
        usage: 'Show migration commands',
        lifecycleEvents: [
          'run',
        ],
        commands: {
          pending: {
            usage: 'Show pending migrations',
            lifecycleEvents: [
              'run',
            ],
          },
          up: {
            usage: 'Migrates everything up',
            lifecycleEvents: [
              'run',
            ],
          },
          down: {
            usage: 'Migrate one migration down',
            lifecycleEvents: [
              'run',
            ],
          },
          history: {
            usage: 'Show migration history',
            lifecycleEvents: [
              'run',
            ],
          },
        },
      },
    };

    this.hooks = {
      'migrations:run': () => this.umzug.cli([]),
      'migrations:pending:run': () => this.umzug.cli(['pending']),
      'migrations:up:run': () => this.umzug.cli(['up']),
      'migrations:down:run': () => this.umzug.cli(['down']),
      'migrations:history:run': () => this.umzug.cli(['history']),
    };

    this.umzug = UmzugCli({
      storage: 'umzug-dynamodb-storage',
      storageOptions: {
        dynamodb: new AWS.DynamoDB('2012-08-10'),
        table: this.config.tablename || 'migrations',
      },
    });
  }
}

module.exports = ServerlessUmzug;
