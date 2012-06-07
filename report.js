module.exports = report

var request = require('request')
var url = process.env.NPATURL || 'http://dtrejo.com/'; // TODO replace

// reports test results to couchCB. additional information about the node
// version and operating system is added before reporting.
// `results` should contain the following properties:
// { version: version of the package being tested
// , stdout: stdout from the test cases that were run
// , stderr: stderr from test cases
// , error: error if necessary
// , code: code exit code from the test's process
// }

function report(results, cb) {
  if (!results.name) cb && cb(new Error('report: No `name` property given'))
  var data =
  // from caller
  { stdout: results.stdout || ''
  , stderr: results.stderr || ''
  , code: results.code
  , error: results.error || ''
  , version: results.version
  , name: results.name || ''

  // from environent
  , node: process.version
  , arch: process.arch
  , platform: process.platform
  }

  var options = { url: results.url || url, json: data }
  
  // TODO: remove me
  console.log(options);
  fs.writeFile(require('path').join(process.env.home, 'report.json')
              , JSON.stringify(options)
              , 'utf8')
  // request.put(options, function(er, response, body) {
  //   // TODO do something?
  // })
}
