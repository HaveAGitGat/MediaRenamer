
//Dependencies
var fs = require("fs");
var ffprobeStaticPath = require("ffprobe-static").path;
var ffprobe = require("ffprobe");
var path = require("path");


//Set media folder to scan
inputPathStem = "C:\\Users\\HaveAGitGat\\Desktop\\Test Temp2";


// 3 try/catch blocks used while traversing in case of invalid characters or untraversable folders
try {
  traverseDir(inputPathStem);
} catch (err) {}

function traverseDir(inputPathStem) {
  fs.readdirSync(inputPathStem).forEach(file => {
    let fullPath = path.join(inputPathStem, file);

    try {
      if (fs.lstatSync(fullPath).isDirectory()) {
        try {
          traverseDir(fullPath);
        } catch (err) {}
      } else {
        var thisFile = fullPath + "";

        ffprobe(
          thisFile,
          {
            path: ffprobeStaticPath
          },
          function(err, info) {

            //FFprobe JSON response logged to console, useful for determining file rename rules
            console.log(info);
            //Set file renaming rules based on properties
            //For example, replace '265' in file titles which refer to files which are actually encoded in h264.
            if (info.streams[0]["codec_name"] == "h264") {
              if (thisFile.includes("265")) {
                thisFileNew = thisFile.replace("265", "264");
                fs.renameSync(thisFile, thisFileNew);
              }

              
            }
          }
        );
      }
    } catch (err) {}
  });
}
