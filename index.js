var xtend = require('xtend/mutable')
var METHODS = ['log', 'info', 'warn', 'error']

function isoTimestamp () {
  return new Date().toISOString()
}

function createProxy (opts) {
  opts = opts || {}

  if (typeof opts == 'function' || typeof opts == 'string')
    opts = {prefix: opts}

  var prefix = opts.prefix || isoTimestamp

  if (typeof prefix != 'function')
    prefix = function () { return opts.prefix }

  var methods = opts.methods || METHODS
  var logger = opts.console || console

  return new Proxy(logger, {
    get: (target, method) => methods.includes(method) ? (...args) => target[method](prefix(), ...args) : target[method]
  })
}

module.exports = xtend(createProxy, createProxy())
