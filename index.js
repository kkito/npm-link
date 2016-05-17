#!/usr/bin/env node

require('shelljs/global');
var fs = require('fs');

// the cache dir of the environment ,eg: ~/.npm-link/npm/
var base_fold = "~/.npm-link/npm/";
mkdir('-p', base_fold);

// install # cnpm install
// cache # mv to cache fold
// clean # clean cache fold
var action = process.argv[2]

function getCacheFold(){
	// 1, md5 package.json
	console.log("the package.json file's md5sum is: ")
	var md5str = exec("md5sum package.json  | awk '{print $1}'").stdout.trim();
	var package_fold = base_fold + "/" + md5str;
	return package_fold;
}

var cache_fold = getCacheFold();
if(action == "clean") {
	console.log("rm fold " + cache_fold)
	rm('-rf', cache_fold);
}else if(action == 'cache') {
	rm('-rf', cache_fold);
	mv('./node_modules' , cache_fold)
	console.log("cache node_modules to " + cache_fold)
}else if(action == "install") {
	if(!fs.existsSync(cache_fold)){
		console.log("cache not found cnpm install")
		exec('cnpm install');
	}else{
		console.log("cache found , mv " + cache_fold )
		mv(cache_fold , './node_modules')
	}
}else {
	console.log('error action, only [install , clean ,cache] valid')
	process.exit(1)
}

// bower .....

// 1 homedir 
// function getUserHome() {
//   return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
//   }
// 2 link eror

