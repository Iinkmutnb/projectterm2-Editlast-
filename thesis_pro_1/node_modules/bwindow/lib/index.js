/**
 * Browser window accessor
 * @module bwindow
 */

'use strict'

let d = (module) => module && module.default || module

module.exports = {
  get get () { return d(require('./get')) },
  get once () { return d(require('./once')) },
  get set () { return d(require('./set')) }
}
