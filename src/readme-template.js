//----------------------------------------------------------------------------//
//-- building the page


//----------------------------------------------------------------------------//
//-- Build Table of Contents
/*

  1. title
  2. License
  3. Description
  4. Installation
  5. Useage
  6. Test
  7. Contributing
  8. Questions

*/
const toc = {
  "1. Title" : undefined,
  "2. License" : undefined,
  "3. Description" : undefined,  
  "4. Installation" : undefined,
  "5. Useage" : undefined,
  "6. Test" : undefined,
  "7. Contributing" : undefined,
  "8. Questions" : undefined,

};

const _get_TOC = sections_Dict => {
  let results = 'TOC Placeholder';
  
  return results;
};


//----------------------------------------------------------------------------//
//-- Building section data

const _get_Guidelines = project_Data => {
  // -- If provided guidelines, build them.

  if (project_Data.guidelines) {
    toc[1] = '#guidelines';
    return `## Guidelines
${project_Data.guidelines}
    `
  }
}

const _get_Useage = project_Data => {
  // -- If provided guidelines, build them.

  //-- if defined
  if (project_Data.useage) {
    
    //-- add to table of contents
    toc[2]('#useage')
    
    //-- return markdown content
    return `## Useage
${project_Data.useage}
    `
  } 
}


// TODO:: 01/07/2022 #EP || Build these out
const _get_License = readme_Data => {
  //-- based on selected license, return short summary and URL
  let { user_Data, project_Data } = readme_Data;
  return `![GitHub license](https://img.shields.io/github/license/${user_Data.github}/${project_Data.title.replace(/\s/g, '-')})`
  +`${project_Data.license}`

  const license_Dict = {
    'NONE' : 'No license.',
    'MIT' : 'mit',
  }
  return license_Summary;
}



//----------------------------------------------------------------------------//
//-- RUNNING 

module.exports = readme_Data => {
  // destructure page data by section
  const { user_Data, project_Data } = readme_Data;

  //-- Build and then return dynamically
  return `# ${project_Data.title}

## License
${_get_License(readme_Data)}

### Description

${project_Data.description}

---

---

## Table of Contents

${_get_TOC(readme_Data)}

---

---

## Installation

${project_Data.installation}

${_get_Guidelines(project_Data)}

## Useage

${project_Data.useage}


## Tests

${project_Data.tests}

## Contributing

${project_Data.contributing}

## Questions
    
Have feedback, suggestions, or general questions?

Reach out to ${user_Data.name}!
- [GitHub.com/${user_Data.github}]("https://github.com/${user_Data.github}")
- ${user_Data.email}
      
---

 &copy; ${new Date().getFullYear()} by ${user_Data.name}

`;};
