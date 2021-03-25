!function (e, t) {
  for (var n in t) e[n] = t[n]
  t.__esModule && Object.defineProperty(e, '__esModule', { value: !0 })
}(exports, (() => {
  'use strict'
  var e = {
    265: function (e, t, n) {
      var r = this && this.__importStar || function (e) {
        if (e && e.__esModule) return e
        var t = {}
        if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) &&
        (t[n] = e[n])
        return t.default = e, t
      }
      Object.defineProperty(t, '__esModule', { value: !0 })
      const o = r(n(87)), i = n(570)

      function s (e, t, n) {
        const r = new u(e, t, n)
        process.stdout.write(r.toString() + o.EOL)
      }

      t.issueCommand = s, t.issue = function (e, t = '') {s(e, {}, t)}

      class u {
        constructor (e, t, n) {
          e ||
          (e = 'missing.command'), this.command = e, this.properties = t, this.message = n
        }

        toString () {
          let e = '::' + this.command
          if (this.properties && Object.keys(this.properties).length > 0) {
            e += ' '
            let n = !0
            for (const r in this.properties) if (this.properties.hasOwnProperty(
              r)) {
              const o = this.properties[r]
              o &&
              (n ? n = !1 : e += ',', e += `${r}=${t = o, i.toCommandValue(t).
                replace(/%/g, '%25').
                replace(/\r/g, '%0D').
                replace(/\n/g, '%0A').
                replace(/:/g, '%3A').
                replace(/,/g, '%2C')}`)
            }
          }
          var t
          return e += `::${function (e) {
            return i.toCommandValue(e).
              replace(/%/g, '%25').
              replace(/\r/g, '%0D').
              replace(/\n/g, '%0A')
          }(this.message)}`, e
        }
      }
    },
    225: function (e, t, n) {
      var r = this && this.__awaiter || function (e, t, n, r) {
        return new (n || (n = Promise))((function (o, i) {
          function s (e) {try {a(r.next(e))} catch (e) {i(e)}}

          function u (e) {try {a(r.throw(e))} catch (e) {i(e)}}

          function a (e) {
            var t
            e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n(
              (function (e) {e(t)}))).then(s, u)
          }

          a((r = r.apply(e, t || [])).next())
        }))
      }, o = this && this.__importStar || function (e) {
        if (e && e.__esModule) return e
        var t = {}
        if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) &&
        (t[n] = e[n])
        return t.default = e, t
      }
      Object.defineProperty(t, '__esModule', { value: !0 })
      const i = n(265), s = n(108), u = n(570), a = o(n(87)), c = o(n(622))
      var f

      function l (e) {i.issue('error', e instanceof Error ? e.toString() : e)}

      function p (e) {i.issue('group', e)}

      function d () {i.issue('endgroup')}

      !function (e) {e[e.Success = 0] = 'Success', e[e.Failure = 1] = 'Failure'}(
        f = t.ExitCode || (t.ExitCode = {})), t.exportVariable = function (
        e, t) {
        const n = u.toCommandValue(t)
        if (process.env[e] = n, process.env.GITHUB_ENV) {
          const t = '_GitHubActionsFileCommandDelimeter_',
            r = `${e}<<${t}${a.EOL}${n}${a.EOL}${t}`
          s.issueCommand('ENV', r)
        } else i.issueCommand('set-env', { name: e }, n)
      }, t.setSecret = function (e) {
        i.issueCommand('add-mask', {}, e)
      }, t.addPath = function (e) {
        process.env.GITHUB_PATH ? s.issueCommand('PATH', e) : i.issueCommand(
          'add-path', {},
          e), process.env.PATH = `${e}${c.delimiter}${process.env.PATH}`
      }, t.getInput = function (e, t) {
        const n = process.env[`INPUT_${e.replace(/ /g, '_').toUpperCase()}`] ||
          ''
        if (t && t.required && !n) throw new Error(
          `Input required and not supplied: ${e}`)
        return n.trim()
      }, t.setOutput = function (e, t) {
        i.issueCommand('set-output', { name: e }, t)
      }, t.setCommandEcho = function (e) {
        i.issue('echo', e ? 'on' : 'off')
      }, t.setFailed = function (e) {
        process.exitCode = f.Failure, l(e)
      }, t.isDebug = function () {
        return '1' === process.env.RUNNER_DEBUG
      }, t.debug = function (e) {
        i.issueCommand('debug', {}, e)
      }, t.error = l, t.warning = function (e) {
        i.issue('warning', e instanceof Error ? e.toString() : e)
      }, t.info = function (e) {
        process.stdout.write(e + a.EOL)
      }, t.startGroup = p, t.endGroup = d, t.group = function (e, t) {
        return r(this, void 0, void 0, (function * () {
          let n
          p(e)
          try {n = yield t()} finally {d()}
          return n
        }))
      }, t.saveState = function (e, t) {
        i.issueCommand('save-state', { name: e }, t)
      }, t.getState = function (e) {return process.env[`STATE_${e}`] || ''}
    },
    108: function (e, t, n) {
      var r = this && this.__importStar || function (e) {
        if (e && e.__esModule) return e
        var t = {}
        if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) &&
        (t[n] = e[n])
        return t.default = e, t
      }
      Object.defineProperty(t, '__esModule', { value: !0 })
      const o = r(n(747)), i = r(n(87)), s = n(570)
      t.issueCommand = function (e, t) {
        const n = process.env[`GITHUB_${e}`]
        if (!n) throw new Error(
          `Unable to find environment variable for file command ${e}`)
        if (!o.existsSync(n)) throw new Error(`Missing file at path: ${n}`)
        o.appendFileSync(n, `${s.toCommandValue(t)}${i.EOL}`,
          { encoding: 'utf8' })
      }
    },
    570: (e, t) => {
      Object.defineProperty(t, '__esModule',
        { value: !0 }), t.toCommandValue = function (e) {
        return null == e
          ? ''
          : 'string' == typeof e || e instanceof String ? e : JSON.stringify(e)
      }
    },
    519: function (e, t, n) {
      var r = this && this.__createBinding ||
        (Object.create ? function (e, t, n, r) {
          void 0 === r && (r = n), Object.defineProperty(e, r,
            { enumerable: !0, get: function () {return t[n]} })
        } : function (e, t, n, r) {void 0 === r && (r = n), e[r] = t[n]}),
        o = this && this.__setModuleDefault ||
          (Object.create ? function (e, t) {
            Object.defineProperty(e, 'default', { enumerable: !0, value: t })
          } : function (e, t) {e.default = t}), i = this && this.__importStar ||
        function (e) {
          if (e && e.__esModule) return e
          var t = {}
          if (null != e) for (var n in e) 'default' !== n &&
          Object.prototype.hasOwnProperty.call(e, n) && r(t, e, n)
          return o(t, e), t
        }
      Object.defineProperty(t, '__esModule', { value: !0 })
      const s = i(n(225))
      !function () {
        try {
          const secrets = JSON.parse(process.env['INPUT_SECRETS']);
          const passed = Object.keys(secrets)
            .filter((secret => Object.keys(process.env).includes(secret)))
            // filter((e => /^INPUT_/.test(e))).
            .map((secret) => {
              if (typeof secret === 'string') {
                s.exportVariable(secret, typeof secrets[secret] === 'object' ? JSON.stringify(secrets[secret]) : secrets[secret])
              }
              return secret;
            })
          console.log('Passed to env ', passed.join(', '));
        } catch (e) {s.setFailed(e.message), process.exit(1)}
      }()
    },
    747: e => {e.exports = require('fs')},
    87: e => {e.exports = require('os')},
    622: e => {e.exports = require('path')},
  }, t = {}
  return function n (r) {
    if (t[r]) return t[r].exports
    var o = t[r] = { exports: {} }
    return e[r].call(o.exports, o, o.exports, n), o.exports
  }(519)
})())
