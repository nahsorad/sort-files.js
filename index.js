/*
    SortFiles is a node.js script that filters through a certain path and
    sorts the files inside the path into corresponding directories/folders.

    Author: Roshan Adhikari
*/

//Import File System 'fs' module
const fs = require('fs')

//Import Path 'path' module
const path = require('path')

//Set the path to search
// var desktop = path.normalize("C:\\Users\\DELL\\Desktop")
var desktop = path.normalize("E:\\SORTFILES_SANDBOX")
console.log("Path for desktop is",desktop)

//Array to store the (list of) file(s) to be scanned
var files = []

//Read the path and invoke the callback function
fs.readdir(desktop,(err,files)=>{
    if(err) throw err;

    //Counter variables to count the number of files
    //for individual extensions
    var ccounter = 0, javacounter = 0, cppcounter = 0, pycounter = 0, cscounter = 0, jscounter = 0;

    //Initialise empty filename
    var fileName = ""

    //Loop through the scanned files
    for(i = 0; i < files.length; i++){
        var file = desktop +"\\"+files[i]

        //Distinguish the basename and extension from the full path of the scanned file
        var baseName = path.basename(file)
        var extName = path.extname(baseName) 
        
        //Split the strings into arrays
        var fileNameArr = baseName.split('.')
        var extArr = extName.split('.')

        /*

        For files with multiple dots '.' in their name, loop through the array contents
        to concatenate individual names into the full name.

        For example, a file demo.js.js.js.txt might be present where .txt is the actual
        extension and 'demo.js.js.js' is the filename exclusing the extension

        */

        // if(fileNameArr.length>1){
        //     for(i = 0; i < fileNameArr.length - 1; i++){
        //         if(i==0)
        //             fileName = fileNameArr[i]
        //         else
        //             fileName = fileName + "." + fileNameArr[i]
        //     }
        // }

        console.log("Just the file name",fileName)
        
        var extension = extArr[extArr.length - 1]

        //Excluding shortcut files (.lnk) and executables (.exe) for the actual sorting
        if(extension!="lnk" && extension!="exe" && extension!=""){
            var dirName = extension.toUpperCase()+" Files"
            fs.mkdir(desktop+"\\"+dirName,(err) => {
                if(err) throw err
            })
        }

        console.log(baseName)
       
        switch(extName){
            case '.c':
                ccounter++
                break;
            case '.java':
                javacounter++
                break;
            case '.js':
                jscounter++
                break;
            case '.py':
                pycounter++
                break;
            case '.cpp':
                cppcounter++
                break;
            case '.cs':
                cscounter++
                break;
            default:
                break;
        }
    
    }
    console.log(""+ccounter+" .c file(s) found.")
    console.log(""+javacounter+" .java file(s) found.")
    console.log(""+jscounter+" .js file(s) found.")
    console.log(""+cppcounter+" .cpp file(s) found.")
    console.log(""+pycounter+" .py file(s) found.")
    console.log(""+cscounter+" .cs file(s) found.")

})


