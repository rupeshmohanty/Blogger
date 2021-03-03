import React, { Component } from 'react';
import { Card, Form, Button } from 'semantic-ui-react';
import axios from 'axios';

// import component!
import NavbarComponent from './NavbarComponent';

class PostComponent extends Component{

    constructor(props) {
        super(props);

        // binding the functions used in the application
        this.onHandleChange = this.onHandleChange.bind(this);
        this.postBlog = this.postBlog.bind(this);

        this.state = {
            loggedInUser: sessionStorage.getItem('userData'),
            title: '',
            brief: '',
            description: '',
            message: ''
        }
    }

    postBlog(e) {
        e.preventDefault();

        const post = {
            email: sessionStorage.getItem('userData'),
            title: this.state.title,
            brief: this.state.brief,
            description: this.state.description
        }

        axios.post('http://localhost/logreg/addBlog.php', post)
        .then(res => {
            if(res.data.sent) {
                this.setState({
                    message: this.state.message
                })

                console.log(this.state.message);

                window.location = '/dashboard';
            } else {
                this.setState({
                    message: this.state.message
                })
            }
        })
        .catch(error => console.log(error));
    }

    onHandleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return(
            <>
                <NavbarComponent/>
                <div classname = "container text-center mt-4">
                    <div style = {{ color: 'red' }}>
                        { this.state.message }
                    </div>
                    <Card style = {{ marginLeft: '30%', width: '40%' }}>
                        <Card.Content>
                            <Card.Header>
                                What's your blog about?
                            </Card.Header>
                            <Card.Description>
                                <Form onSubmit = { this.postBlog }>
                                    <Form.Field>
                                        <input type = "hidden" name = "email" value = { this.state.loggedInUser }/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Title</label>
                                        <input type = "text" placeholder = "Title" name = "title" value = { this.state.title } onChange = { this.onHandleChange }/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Brief</label>
                                        <input type = "text" placeholder = "Brief" name = "brief" value = { this.state.brief } onChange = { this.onHandleChange }/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Description</label>
                                        <textarea name = "description" placeholder = "Start scribbling" onChange = { this.onHandleChange }>{ this.state.description }</textarea>
                                    </Form.Field>
                                    <Button type = "submit">Post</Button>
                                </Form>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </div> 
            </>
        )
    }
}

export default PostComponent;