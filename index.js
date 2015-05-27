#!/usr/bin/env node

var child_process = require('child_process');

var argv = process.argv;
argv.shift();

var file_path = __dirname;
var current_path = process.cwd();

var server_port = 3000;

if ( argv.length > 1 ) {
  // console.log(argv)
  var first_arg = argv[1];
  if ( first_arg == '-h' || first_arg == '--help' ) {
    return console.log('Usages: who-use is a tool for look user by server port. only use for mac');
  }else{
    server_port = (argv[1] + '').trim();
  }
}

var script = 'lsof -i:' + server_port +'|grep ' + server_port + '|awk \'{print "USER："$1" PID："$2}\'';

// execFile: executes a file with the specified arguments
child_process.exec(script,
  function (error, stdout, stderr) {
    if (error !== null) {
      console.log('who-use exec error: ' + error);
    }else{
      if (stdout) {
        console.log('\nFind it who used ' + server_port + ' ！！！\n');
        console.log(stdout);        
      }else {
        console.log('\nYeah！No One used ' + server_port + '\n');
      };
    }
});