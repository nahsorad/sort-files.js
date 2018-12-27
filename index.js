/*
   SortFiles is a node.js script that filters through a certain path and
   sorts the files inside the path into corresponding directories/folders.
   Author: Roshan Adhikari
*/

//Import File System 'fs' module
const fs = require('fs')

//Import Path 'path' module
const path = require('path')

//Declarations
var directoryPath = ""

//Set the path to be searched
var here = function (searchPath){
    directoryPath = searchPath
}

var move = function(){
    directoryPath = path.normalize(directoryPath)
    console.log("Path to be searched is", directoryPath)

    //Array to store the (list of) file(s) to be scanned
    var files = []

    //Read the path and invoke the callback function
    fs.readdir(directoryPath, (err, files) => {
        if(err) console.log("Path",directoryPath,"could not be read: "+err.message)

        //Variable declarations
        var fileName = ""
        var file = ""
        var baseName = ""
        var extName = ""
        var fileNameArr = []
        var extArr = []
        var extension
        var dirName
        var dirPath
        var oldPath
        var newPath
        var moveError = false

        //Loop through the scanned files
        for(i = 0; i < files.length; i++){
            file = directoryPath + "\\" + files[i]

            //Distinguish the basename and extension from the full path of the scanned file
            baseName = path.basename(file)
            extName = path.extname(baseName) 

            //Split the strings into arrays
            fileNameArr = baseName.split('.')
            extArr = extName.split('.')

            /*

            For files with ultiple dots '.' in their name, split the basename with the extension name

            For example, a file demo.js.js.js.txt might be present where .txt is the actual
            extension and 'demo.js.js.js' is the filename exclusing the extension

            */

            if(fileNameArr.length > 1){
                fileName = baseName.split(extName).join('')
            }

            // console.log("Just the file name",fileName)

            extension = extArr[extArr.length - 1]

            //Excluding shortcut files (.lnk) and executables (.exe) for the actual sorting
            if(extension != "lnk" && extension != "exe" && extension != ""){
                dirName = extension.toUpperCase() + " Files"
                dirPath = directoryPath + "\\" + dirName
                fs.mkdir(dirPath, (err) => {
                    if(err) console.log("Directory",dirName,"could not be created: "+err.message)
                })

                oldPath = file
                newPath = dirPath + "\\" + baseName
            
                console.log("File path is: " + file)
                console.log("Move to path: " + newPath)

                fs.rename(oldPath, newPath, (err) => {
                    if(err) {
                        console.log("File",baseName,"could not be moved: "+err.message)
                        moveError = true
                    }
                })

                if(!moveError){
                    console.log("File",baseName,"moved successfully!")
                }
            }
        }
    });
}

module.exports.here = here;
module.exports.move = move;
