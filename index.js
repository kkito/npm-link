#!/usr/bin/env node

require('shelljs/global');
// the cache dir of the environment ,eg: ~/.npm-link/npm/
var base_fold = "~/.npm-link/npm/";
mkdir('-p', base_fold);

// 1, md5 package.json
var md5str = exec("md5sum package.json  | awk '{print $1}'").stdout.trim();
var package_fold = base_fold + "/" + md5str;
mkdir('-p', package_fold);

// if fold exist PATH/md5sum/



// if exist , rm the node_modules , and link to the dir
rm('-rf', 'node_modules');

// if not , mkdir dir and link
ln('-s' , package_fold , 'node_modules');


// run npm install // or can use cnpm 
exec('cnpm install');

// bower .....


