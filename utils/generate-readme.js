/*
    Purpose: Manage files with package FS
*/

//----------------------------------------------------------------------------//
//-- Imports
const fs = require('fs');

//----------------------------------------------------------------------------//
//-- Writing README.md


const writeFile = fileContent => {
    
    return new Promise((resolve, reject) => {
      fs.writeFile('./dist/README.md', fileContent, err => {
        /* if there's an error, reject the Promise and send the error to the
            Promise's `.catch()` method.
        */
        if (err) {
          reject(err);
          /* return out of the function here to make sure the Promise doesn't
            accidentally execute the resolve() function as well.
          */
          return;
        }
  
        /* if everything went well, resolve the Promise and send the successful
            data to the `.then()` method.
        */
        resolve({
          ok: true,
          message: 'README.md was created! \n\t ( See ./dist.README.md )'
        });
      });
    });
};
  

//----------------------------------------------------------------------------//
//-- Exporting functions for app.js to have access to
module.exports = {
    writeFile
};