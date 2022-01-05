/*
    Author:: Erik Plachta
    Date:: 01/04/2021
    Purpose:: Use Node.js and Inquirier.js node package to build a README.md
                via command line.  
*/

//----------------------------------------------------------------------------//
//-- Imports


//-- grabbing functions from generate-site with object destructing
const { writeFile, copyFile } = require('./utils/generate-site.js');

const inquirer = require('inquirer');
const generatePage = require('./src/readme-template');

//----------------------------------------------------------------------------//
//-- Getting User Data

const get_User_Data = () => {
    /* 
        Uses inquirer.js to prompt user specific details.
    */

    
    return inquirer.prompt([
        //-- Name
        {
          type: 'input',
          name: 'name',
          message: 'What is your name? (Required)',
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
            message: 'Enter your GitHub Username (Required)',
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
        //-- TODO:: Make sure it knows it's an email address
        //-- TODO:: Pull and add to proper section ( Issue #8)
        {
            type: 'input',
            name: 'email',
            message: 'What is your email address? (Required)',
            validate: emailInput => {
              if (nameInput) {
                return true;
              } else {
                console.log('Please enter your email address!');
                return false;
              }
            }
          }
    ]);
};


//----------------------------------------------------------------------------//
//-- Getting Readme Data

const get_Readme_Data = () => {
    /* 
        Uses inquirer.js to prompt user for README specific details.
    */


    return inquirer.prompt([
      
      //-- Project Title
      //-- TODO:: Add license options ( see issue #7)
        {
          type: 'input',
          name: 'title',
          message: 'Enter your Project Title (Required)',
          validate: titleInput => {
            if (titleInput) {
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
          message: 'Enter your Project description (Required)',
          validate: descriptionInput => {
            if (descriptionInput) {
              return true;
            } else {
              console.log('Please enter your Project Description!');
              return false;
            }
            }
        },
        
        //-- License
        {
          type: 'input',
          name: 'license',
          message: 'What type of license? (Required)',
          validate: licenseInput => {
            if (licenseInput) {
              return true;
            } else {
              console.log('Please enter your name!');
              return false;
            }
          }
        },
    ]);
};

//----------------------------------------------------------------------------//
//-- Build Table of Contents

//----------------------------------------------------------------------------//
//-- Running Program

