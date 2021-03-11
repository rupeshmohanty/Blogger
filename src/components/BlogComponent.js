import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react'

// getting the required components!
import NavbarComponent from './NavbarComponent';

function BlogComponent() {
    let { id } = useParams();

    const [post, setPost] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        axios.get('http://localhost/logreg/getBlog.php?id=' + id)
        .then(res => {
            if(res.data.sent) {
                setPost(res.data.post)
            } else {
                setMessage(res.data.message)
            }
        })
        .catch(error => console.log(error))

        console.log(post)
    })

    return(
        <div>
            <NavbarComponent/>
            <Container text textAlign = 'center'>
                {
                    message ? (<div>
                        { message }
                    </div>):(
                        <div></div>
                    )
                }
                <Header as = 'h1'>
                    { post.title }
                </Header>
                <span className = "text-muted">By { post.email } <br/>{ post.createdAt }</span><br/>
                <p>
                    { post.description }
                </p>
            </Container>
        </div>
    )
}

export default BlogComponent;