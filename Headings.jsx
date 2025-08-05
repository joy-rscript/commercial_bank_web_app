import React from 'react'

function Headings({headingNames}) {

  return (
    < >
        
                {headingNames.map(headingName => (
                    <th scope="col" class="px-6 py-3" style={{fontWeight: '300'}}>
                        {headingName}
                    </th>
                    
                ))}
        </>
  )
}

export default Headings