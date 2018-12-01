module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777",
    },
    getho: {
      host: "strong-lion-40123.getho.io/jsonrpc",
      port: 80,
      network_id: 1010,
      gas: 4712388
    }
  }
};
