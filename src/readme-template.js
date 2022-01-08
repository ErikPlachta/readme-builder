//----------------------------------------------------------------------------//
//-- building the page


//----------------------------------------------------------------------------//
//-- Build Table of Contents

function _set_TOC(project_Data, toc, TOC) {
  //-- if values defined, add to index4

  let location = 1;
  for (section in toc){
    
    //-- the section has defined content within the user data
    if(project_Data[toc[section]]){

      //-- if title of project as header
      if (toc[section] === 'title'){
        //-- remove spaces between letters and assign to actual title of project
        TOC[location] = (project_Data[toc[section]].replace(/\s/g, '-')).toLowerCase();
        location = location +1;
      }

      //-- all other section titles don't change
      else {
        TOC[location] = toc[section];
        location = location +1;
      }
    }

  };
  return TOC;
};


const _get_TOC = TOC => {
  //-- Build TOC based on if values are defined
  
  TOC_Formatted = '';

  for (section in TOC) {
    // console.log(TOC[section])
    //-- Build the ToC
    TOC_Formatted = TOC_Formatted + `
${section}. [${TOC[section]}](#${TOC[section]})`;
    
  }; 
  return TOC_Formatted;
};

//----------------------------------------------------------------------------//
//-- Building section data

const _get_Guidelines = project_Data => {
  // -- If provided guidelines, build them.

  // console.log(project_Data.guidelines);
  if (project_Data.Guidelines) {
    return `## Guidelines

${project_Data.Guidelines}`
  }
}

const _get_Useage = project_Data => {
  // -- If provided guidelines, build them.

  //-- if defined
  if (project_Data.Useage_summary) {
    //-- return markdown content
    return `## Useage

${project_Data.Useage_summary}

${project_Data.Useage_syntax}
    `
  } 
}


// TODO:: 01/07/2022 #EP || Build these out
const _get_License = readme_Data => {
  
  //-- Build README content
  
  //-- based on selected license, return short summary and URL
  let { user_Data, project_Data } = readme_Data;
  return `![GitHub license](https://img.shields.io/github/license/${user_Data.github}/${project_Data.Title.replace(/\s/g, '-')})`
  // +`${project_Data.license}`

  const license_Dict = {
    'NONE' : 'No license.',
    'MIT' : 'mit',
  }
  return license_Summary;
}

//TODO -- give user option to pick from this or type manually
const _get_Contribution = project_Data => {
  
  if (project_Data.Contributing === 'Contributor-Covenant'){
    return `This Project abides by the Contributor Covenant. 
    > For more information, check out https://www.contributor-covenant.org/.`
  } 
  else if (project_Data.Contributing === 'None'){
    return `This Project Does not accept contributions at this time.`
  } 
  //-- Whatever user picked/typed
  else {
    return `${project_Data.Contributing}`
  }
}


//----------------------------------------------------------------------------//
//-- RUNNING 

module.exports = readme_Data => {
  // destructure page data by section
  const { user_Data, project_Data, toc } = readme_Data;

  //-- Holds table of content
  var TOC = {};
  
  
  //-- Build ToC based on provided data
  TOC = _set_TOC(project_Data,toc,TOC); 

  // console.log("project_Data: ", project_Data)
  // console.log("TOC: ", TOC)
  //-- Build and then return dynamically
  return `# ${project_Data.Title}
  
## Description

${project_Data.Description}

${_get_License(readme_Data)}

---

---
  
## Table of Contents
${_get_TOC(TOC)}
  
---

---

## Installation

${project_Data.Installation}

${_get_Guidelines(project_Data)}

## Useage

${project_Data.Useage}

## Testing

${project_Data.Test}

## Contributing

${_get_Contribution(project_Data)}

## Questions

Have feedback, suggestions, or general questions?
> You can reach out to me, ${user_Data.name}, on my 
[GitHub]("https://github.com/${user_Data.github}") or via email
at ${user_Data.email}.
      
---

 &copy; ${new Date().getFullYear()} by ${user_Data.ame}

`;};
