const cluster = require('cluster');
const { cpus } = require('os');
const process = require('process');

const numCPUs = cpus().length;

const clusterize = async (entrypoint, { children = numCPUs, prodOnly = false, respawn = true }) => {
  if (prodOnly && process.env.NODE_ENV !== 'production') {
    return entrypoint();
  }

  if (cluster.isPrimary) {
    for (let i = 0; i < children; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);

      if (respawn) {
        console.log('Restarting failed worker process...');
        cluster.fork();
      }
    });
  } else {
    await entrypoint();
  }
};

module.exports = clusterize;
