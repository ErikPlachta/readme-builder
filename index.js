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
        name: 'license',
        message: 'Add a License:',
        choices: ['None','ISC', 'MIT', 'GNU']
      },
    //-- Project Title
      {
        type: 'input',
        name: 'title',
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
        name: 'description',
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
          name: 'installation',
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
          name: 'guidelines',
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
          name: 'useage_summary',
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
          name: 'useage_syntax',
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
          name: 'testing',
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
          name: 'contributing',
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
        "title" : undefined,
        "license" : undefined,
        "description" : undefined,
        "guidelines" : undefined,
        "installation" : undefined,
        //-- How to use it
        'useage' : 'useage',
        "useage_summary" : undefined,
        "useage_syntax" : undefined,
        'testing' : undefined,
        'contributing' :'contributing',
        'questions' :'questions'
      }, 
      'toc' : {
        1: 'title',
        2: 'description',
        3: 'guidelines',
        4: 'installation',
        5: 'useage',
        6: 'license',
        7: 'testing',
        8: 'contributing',
        9: 'questions'
      }
    };
  
  //-- Get user specific info
  _get_User_Data()

    //-- then write userdata to array
    .then( user_Data => {
      readme_Data.user_Data = Object.assign({},user_Data,readme_Data.user_Data);
    })
  
    //-- Get project specific info
    .then(_get_Project_Data)

    .then( project_Data => {
      
      console.log(project_Data.guidelines)
      
      //-- Set Project data dict value
      readme_Data.project_Data = Object.assign({},readme_Data.project_Data,project_Data);
      
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
// init();

testing();


//-- TESTING -----------------------------------------------------------------//

function testing(){
  const readme_Data = {
    'user_Data':{
      'name' : "Erik Plachta",
      'github' : 'erikplachta',
      'email' : 'erik@plachta.com'
    },
    'project_Data': {
      'title': 'erikplachta',
      'license': 'MIT',
      'description': 'All about EP',
      'guidelines': 'Use this repo to build a readme file',
      'installation': 'Download REPO from GitHub, type `node i` to init',
      'useage': 'useage guidlines go here',
      'useage_summary': 'Run `node index` to get prompted on how to build a readme. Then retrieve readme from the `./dist` folder.',
      'useage_syntax': '`node index`',
      'testing': 'type `node index` in command',
      'contributing': 'Contributor-Covenant',
      'questions': 'questions'
    },
    'toc': {
      1: 'title',
      2: 'description',
      3: 'guidelines',
      4: 'installation',
      5: 'useage',
      6: 'license',
      7: 'testing',
      8: 'contributing',
      9: 'questions'
    }
  }

  const test_Functionality = async () => {

    let results = _generate_Readme(readme_Data)
    
    //-- Write readme file to ./dist/README.md
    writeFile(results)
    .then(response => console.log(response))

    // console.log(response);
      
      //-- If success, we take the writeFileResponse object provided by the writeFile()
      // function's resolve() execution to log it.
    //   .then(writeFileResponse => {
    //     console.log(writeFileResponse);
    //   })
    //   //-- if it fails any-step along the way, catch error nd log here.
    //   .catch(err => {
    //     console.log("ERROR: ", err);
    //   }
    // );
  };
  test_Functionality();
  
    


}