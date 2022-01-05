//----------------------------------------------------------------------------//
//-- building the page

module.exports = readme_Data => {
  // destructure page data by section
  const { user_Data, project_Data } = readme_Data;

  return `

    # ${project_Data.title}

    
    ### Description

    ${project_Data.description}
    
    ## License

    ${project_Data.license}

    ## About Me
      
      - ${user_Data.name}
      - [GitHub.com/${user_Data.github}]("https://github.com/${user_Data.github}")
      - Email: ${user_Data.email}
            
    ---
    
    &copy; ${new Date().getFullYear()} by ${user_Data.name}
    
  `;
};
