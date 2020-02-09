const https = require('https');
const fs = require('fs');
const unzip = require('unzip-stream');
const exec = require('child_process').exec;  

const REST_BASE = "https://dev.azure.com/esy-ocaml/"
const PROJ = "esy-ocaml"
const PREFIX="branchName=refs%2Fheads%2F"
const SYSTEM_PULLREQUEST_TARGETBRANCH="master"
const AGENT_OS="WINDOWS_NT"
const ESY__CI_CACHE_VERSION="v1"
const ART_NAME="cache-"+AGENT_OS+"-install-"+ESY__CI_CACHE_VERSION
const FILTER='deletedFilter=excludeDeleted&statusFilter=completed&resultFilter=succeeded'
const BRANCH=PREFIX+SYSTEM_PULLREQUEST_TARGETBRANCH
const LATEST = 'queryOrder=finishTimeDescending&$top=1'
const API_VERSION = 'api-version=4.1'
const CURRENT_DIR = __dirname
const REST_BUILDS = REST_BASE+'/'+PROJ+'/_apis/build/builds?'+FILTER+'&'+BRANCH+'&'+LATEST+'&'+API_VERSION

console.log(REST_BUILDS)
var LATEST_BUILD_PAGE = "";
var LATEST_BUILD_BADGE = "";
var LATEST_BUILD_ID = ""; 
var LATEST_ART_URL = "";

function fetch_latest_build() {
    const REST_BUILDS_RESPONSE = https.get(REST_BUILDS, function(response) {
        let RESPONSE_DATA = [];
        let sLATEST_BUILD_PAGE = "";
        let sLATEST_BUILD_BADGE = "";
        let sLATEST_BUILD_ID = "";

        response.on('data', function (body) {
            RESPONSE_DATA.push(body);
        }).on('end', function() {
            let data   = Buffer.concat(RESPONSE_DATA);
            var resObj = JSON.parse(data);
            LATEST_BUILD_PAGE = resObj['value'][0]['_links']['web']['href'];
            LATEST_BUILD_BADGE = resObj['value'][0]['_links']['badge']['href'];
            LATEST_BUILD_ID = resObj['value'][0]['id'];

            fetch_artifact_url()
        });
        
    });
}

function fetch_artifact_url() {
    let RESPONSE_DATA = [];
    const REST_ART=REST_BASE+"/"+PROJ+"/_apis/build/builds/"+LATEST_BUILD_ID+"/artifacts?artifactName="+ART_NAME+"&api-version=4.1"
    const REST_ART_RESPONSE = https.get(REST_ART, function(response) {
        response.on('data', function (body) {
            RESPONSE_DATA.push(body);
        }).on('end', function() {
            let data   = Buffer.concat(RESPONSE_DATA);
            var Obj = JSON.parse(data);
            LATEST_ART_URL = Obj['resource']['downloadUrl']
            download_artifact_and_extract()
        });
    });
}

function download_artifact_and_extract() {
    var output_path = CURRENT_DIR+'/'+ART_NAME+'.zip'
    var file = fs.createWriteStream(output_path);
    https.get(LATEST_ART_URL, function(res) {
        res.on('data', function(data) {
            file.write(data);
        }).on('end', function() {
            file.end();
            const UNTAR_DIRECTORY = CURRENT_DIR
            if (!fs.existsSync(UNTAR_DIRECTORY)){
                fs.mkdirSync(UNTAR_DIRECTORY);
            }
            fs.createReadStream(output_path)
                .pipe(unzip.Extract({ path:UNTAR_DIRECTORY }))
                .on('close', function () {
                    let source_directory = UNTAR_DIRECTORY+'/'+ART_NAME+'/_export';
                    let destination_directory = UNTAR_DIRECTORY+'/_import'
                    if (fs.existsSync(source_directory)) {
                        fs.rename(source_directory,destination_directory, function (err) {
                            if (err) throw err
                            if(AGENT_OS == "WINDOWS_NT") {
                                fs.readdirSync(destination_directory).forEach(file => {
                                    let command = "esy.cmd import-build "+file
                                    exec(command, (err, stdout, stderr) => console.log(stdout))
                                });
                            } else {
                                let command = "esy import-dependencies _import"
                                exec(command, (err, stdout, stderr) => console.log(stdout))
                            }
                        })
                    } else {
                        console.log("_export directory does not exist")
                    }
                 });
           
        });
    });
}

fetch_latest_build()
