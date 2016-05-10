#!/usr/bin/env node

require('shelljs/global');
var fs = require('fs');

// the cache dir of the environment ,eg: ~/.npm-link/npm/
var base_fold = "~/.npm-link/npm/";
mkdir('-p', base_fold);

// 1, md5 package.json
var md5str = exec("md5sum package.json  | awk '{print $1}'").stdout.trim();
var package_fold = base_fold + "/" + md5str;

// if exist , rm the node_modules , and link to the dir
rm('-rf', 'node_modules');
ln('-s' , package_fold , 'node_modules');

if(!fs.existssync(package_fold)){
	// file not exist
	mkdir('-p', package_fold);

	// run npm install // or can use cnpm 
	exec('cnpm install');

}


// bower .....


