//----------------------------------------------------------------------------//
//-- building the page

const _get_TOC = sections_Dict => {
  let results = 'TOC Placeholder';
  
  return results;
};


const _get_License = license_Selected => {
  //-- based on selected license, return short summary and URL


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

[![GitHub license](https://img.shields.io/github/license/${user_Data.name}/${user_Data.github})](https://github.com/${user_Data.name}/${user_Data.github})


${project_Data.license}

### Description

${project_Data.description}

---

---

## Table of Contents

${_get_TOC(readme_Data)}

---

---

## Installation

## Guidelines

## Useage

## Contributing

## Tests

## Questions
    
Have feedback, suggestions, or general questions?

Reach out to ${user_Data.name}!
- [GitHub.com/${user_Data.github}]("https://github.com/${user_Data.github}")
- ${user_Data.email}
      
---

 &copy; ${new Date().getFullYear()} by ${user_Data.name}
`;
};
