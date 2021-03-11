import React from 'react';
import { useParams } from 'react-router-dom';

// getting the required components!
import NavbarComponent from './NavbarComponent';

function BlogComponent() {
    let { id } = useParams();

    return(
        <div>
            <NavbarComponent/>
            { id }
        </div>
    )
}

export default BlogComponent;