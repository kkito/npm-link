#!/usr/bin/env node

require('shelljs/global');
var fs = require('fs');

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

// the cache dir of the environment ,eg: ~/.npm-link/npm/
var base_fold = getUserHome() + "/.npm-link/npm/";
var base_bower_fold = getUserHome() + "/.npm-link/bower/";
mkdir('-p', base_fold);

// install # cnpm install
// cache # mv to cache fold
// clean # clean cache fold
var action = process.argv[2]

var has_bower = fs.existsSync("bower.json");

function getCacheFold(){
	// 1, md5 package.json
	console.log("the package.json file's md5sum is: ")
	var md5str = exec("md5sum package.json  | awk '{print $1}'").stdout.trim();
	var package_fold = base_fold + "/" + md5str;
	return package_fold;
}

function getBowerCacheFold(){
	console.log("the bower.json file's md5sum is: ")
	var md5str = exec("md5sum bower.json | awk '{print $1}'").stdout.trim();
	var package_fold = base_bower_fold + "/" + md5str;
	return package_fold;

}

var cache_fold = getCacheFold();
var cache_bower_fold = getBowerCacheFold();

if(action == "clean") {
	console.log("rm fold " + cache_fold)
	rm('-rf', cache_fold);
    if(has_bower) {
        console.log("rm fold " + cache_bower_fold)
        rm('-rf', cache_bower_fold);
    }
}else if(action == 'cache') {
	rm('-rf', cache_fold);
	mv('./node_modules' , cache_fold)
	console.log("cache node_modules to " + cache_fold)
    if(has_bower) {
        rm('-rf', cache_bower_fold);
        mv('./bower_components' , cache_bower_fold)
        console.log("cache bower_components to " + cache_bower_fold)
    }
}else if(action == "install") {
	if(!fs.existsSync(cache_fold)){
		console.log("cache not found cnpm install")
		exec('cnpm install');
	}else{
		console.log("cache found , mv " + cache_fold )
		rm('-rf', "./node_modules");
		mv(cache_fold , './node_modules')
	}

    if(has_bower) {
        if(!fs.existsSync(cache_bower_fold)){
            console.log("cache not found bower install")
            exec('bower install');
        }else{
            console.log("cache found , mv " + cache_bower_fold)
            rm('-rf', "./bower_components");
            mv(cache_fold , './bower_components')
        }
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

