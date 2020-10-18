const { spawn } = require('child_process')

const server = spawn(
  'docker',
  [
    'run',
    '-e', 'FILTER_REGEX_EXCLUDE=.*dist/.*|.*idea/.*|.*DS_Store',
    '-e', 'RUN_LOCAL=true',
    '-e', 'VALIDATE_HTML=false',
    '-v', [__dirname, '/tmp/lint'].join(':'),
    'rieset/super-linter-standardx:v1'
  ],
  {
    cwd: './',
    shell: false
  }
)

// register event listeners on server
server.stdout.on('data', data => {
  console.log('\x1b[33m%s\x1b[0m', `${data}`)
})

// register event listeners on server
server.stderr.on('data', data => {
  console.log('\x1b[36m%s\x1b[0m', `${data}`)
})

// register event listeners on server
server.on('close', code => {
  console.log(`child process close with code ${code}`)
})

server.on('exit', code => {
  console.log(`child process exit with code ${code}`)
  server.kill(0)
})

// docker run -e jasmine -e RUN_LOCAL=true -e VALIDATE_HTML=false -e FILTER_REGEX_EXCLUDE=".*dist/.*|.*idea/.*|.*DS_Store" -e TYPESCRIPT_ES_CONFIG_FILE=.eslintrc.yml -v __dirname:/tmp/lint rieset/super-linter-standardx:v1
