const rpc = require('./rpc');
const rpcWrap = require('./rpcWrap');
const RpcIpcManager = require('./RpcIpcManager');

module.exports = {
    rpc,
    rpcWrap: wrap,
    RpcIpcManager: RpcIpcManagerClass
};