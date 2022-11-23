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
      'migrations:run': () => this.umzug([]),
      'migrations:pending:run': () => this.umzug(['pending']),
      'migrations:up:run': () => this.umzug(['up']),
      'migrations:down:run': () => this.umzug(['down']),
      'migrations:history:run': () => this.umzug(['history']),
    };

  }

  umzug(args) {
    const region = this.config.region || this.serverless.service.provider.region;
    const cli = UmzugCli({
      storage: 'umzug-dynamodb-storage',
      storageOptions: {
        dynamodb: new AWS.DynamoDB({
          apiVersion: '2012-08-10',
          region,
        }),
        table: this.config.tablename || 'migrations',
      },
      migrations: {
        params: [
          this.serverless.service,
        ],
      },
    });

    return cli.cli(args);
  }
}

module.exports = ServerlessUmzug;
