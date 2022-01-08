/*
    Author:: Erik Plachta
    Date:: 01/04/2021
    Purpose:: Use Node.js and Inquirier.js node package to build a README.md
                via command line.  
*/

//----------------------------------------------------------------------------//
//-- Imports

//-- grabbing functions from generate-site with object destructing
const {writeFile} = require('./utils/generate-readme.js');

const inquirer = require('inquirer');
const _generate_Readme = require('./src/readme-template.js');


//----------------------------------------------------------------------------//
//-- Global Variables



//----------------------------------------------------------------------------//
//-- Getting User Data

const _get_User_Data = () => {
    /* 
        Uses inquirer.js to prompt user specific details.

        collecting the following values
          name
          github
          email
    */

    console.log(`
======================
Enter User Information
======================
    `);
    
    return inquirer
      .prompt([

        //-- Name
        {
          type: 'input',
          name: 'name',
          message: 'Your name: ',
          validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter your name!');
              return false;
            }
          }
        },

        //-- GitHub Username
        {
            type: 'input',
            name: 'github',
            message: 'Your GitHub Username: ',
            validate: githubInput => {
                if (githubInput) {
                return true;
                } else {
                console.log('Please enter your GitHub username!');
                return false;
                }
            }
        },

        //-- Email Address
        //-- TODO:: Pull and add to proper section ( Issue #8)
        {
            type: 'input',
            name: 'email',
            message: 'Your email address ( for others to contact you ): ',
            validate: function(email) {
              // Regex mail check (return true if valid mail)
              let valid_Email = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
              if (valid_Email){
                return true;
              }
              else {
                console.log('Please enter a valid email address!');
                return false;
              }
           }
        }
          
    ]);
};


//----------------------------------------------------------------------------//
//-- Getting Data about the project specifically.

const _get_Project_Data = () => {
  /* 
      Uses inquirer.js to prompt user for README specific details.

      collecting the following values
        
          license
          title
          description
          installation
          guidelines
          useage
  */


  console.log(`
=========================
Enter Project Information
=========================
  `);

  return inquirer
    .prompt([
      
      //-- License assigned to project
      //-- TODO:: 01/07/2022 #EP || Add more
      {
        type: 'list',
        name: 'License',
        message: 'Add a License:',
        choices: ['None','ISC', 'MIT', 'GNU']
      },
    //-- Project Title
      {
        type: 'input',
        name: 'Title',
        message: 'Enter your Project Title ( as appears on GitHub ): ',
        validate: input => {
          if (input) {
            return true;
          } else {
            console.log('Please enter a Project Title!');
            return false;
          }
          }
      },
      
      //-- Description
      {
        type: 'input',
        name: 'Description',
        message: 'Enter your Project description: ',
        validate: input => {
          if (input) {
            return true;
          } else {
            console.log('Please enter your Project Description!');
            return false;
          }
        }
      },
      
      //-- Installation
        // What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.
        {
          type: 'input',
          name: 'Installation',
          message: 'Enter installation instructions (text summary) : ',
          validate: input => {
            if (input) {
              return true;
            } else {
              console.log('Please enter your Project installation instructions!');
              return false;
            }
          }
        },
        
      //-- Gudielines
        //-- 
        {
          type: 'input',
          name: 'Guidelines',
          message: 'Enter your project guidelines: ',
          validate: input => {
            if (input) {
              return true;
            } else {
              console.log('Please enter your Project guidelines!');
              return false;
            }
          }
        },

      //-- Useage
        // Provide instructions and examples for use. Include screenshots as needed.
        {
          type: 'input',
          name: 'Useage_summary',
          message: 'Enter a short summary of HOW to use the project ( syntax is next ): ',
          validate: input => {
            if (input) {
              return true;
            } else {
              console.log('Please enter your Project useage summary!');
              return false;
            }
            }
        },

        {
          type: 'input',
          name: 'Useage_syntax',
          message: 'Enter the syntax  ( required ): ',
          validate: input => {
            if (input) {
              return true;
            } else {
              console.log('Please enter your Project useage syntax!');
              return false;
            }
          }
        },

        //-- Testing
        //-- 
        {
          type: 'input',
          name: 'Test',
          message: 'Enter how to test this project: ',
          validate: input => {
            if (input) {
              return true;
            } else {
              console.log('Please enter your Project testing paramters!');
              return false;
            }
          }
        },

        //-- Contribution
        //TODO:: 01/07/2022 #EP || Add more contribution options
        {
          type: 'list',
          name: 'Contributing',
          message: 'How would you like to handle project contributions?: ',
          choices: ['Contributor-Covenant','None'],
        },

    ])
  ; //-- End of return statement
};

//----------------------------------------------------------------------------//
//-- Running Program


function init() {
  /*
    Primary function that runs the program.
  */

    //-- Array that holds user and project data
    var readme_Data = {
      'user_Data':{
        'name' : undefined,
        'github' : undefined,
        'email' : undefined
      },
      'project_Data': {
        "Title" : undefined,
        "License" : undefined,
        "Description" : undefined,
        "Guidelines" : undefined,
        "Installation" : undefined,
        //-- How to use it
        'Useage' : 'Useage',
        "Useage_summary" : undefined,
        "Useage_syntax" : undefined,
        'Testing' : undefined,
        'Contributing' :'Contributing',
        'Questions' :'Questions'
      }, 
      'toc' : {
        1: 'Title',
        2: 'Description',
        3: 'Guidelines',
        4: 'Installation',
        5: 'Useage',
        6: 'Testing',
        8: 'Contributing',
        9: 'Questions'
      }
    };
  
  //-- Get user specific info
  _get_User_Data()

    //-- then write userdata to array
    .then( user_Data => {
      readme_Data.user_Data = Object.assign({},readme_Data.user_Data, user_Data);
    })
  
    //-- Get project specific info
    .then(_get_Project_Data)

    .then( project_Data => {
      
      //-- Set Project data dict value
      readme_Data.project_Data = Object.assign({},readme_Data.project_Data, project_Data);
      
      //-- return dict updated
      return readme_Data;
    }) 

    //-- Send data into template to build OBJ that will be used to write
    .then( readme_Data => {
      return _generate_Readme(readme_Data);
    })

    //-- Write readme file to ./dist/README.md
    .then( readme_Data => {
      return writeFile(readme_Data);
    })

    //-- If success, we take the writeFileResponse object provided by the writeFile()
    // function's resolve() execution to log it.
    .then(writeFileResponse => {
      console.log(writeFileResponse);
    })
    //-- if it fails any-step along the way, catch error nd log here.
    .catch(err => {
      console.log("ERROR: ", err);
    })
  ;

};

//-- Runs program
init();
