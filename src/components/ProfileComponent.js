import React, { Component } from 'react';
import NavbarComponent from './NavbarComponent';
import { Form, TextArea, Button, Card, Input } from 'semantic-ui-react';
import axios from 'axios';

class ProfileComponent extends Component{

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.addBio = this.addBio.bind(this);

        this.state = {
            email: sessionStorage.getItem('userData'),
            bio: '',
            message: ''
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addBio(e) {
        e.preventDefault();
        
        const bio = {
            email: this.state.email,
            bio: this.state.bio
        }

        axios.post('http://localhost/logreg/addBio.php', bio)
        .then(res => {
            if(res.data.sent) {
                this.setState({
                    message: res.data.message
                })

                console.log(this.state.message)

                window.location = '/dashboard';
            } else {
                this.setState({
                    message: res.data.message
                })
            }
        })
    }

    render() {
       
        return(
            <>
                <NavbarComponent/>
                <div className = "container text-center mt-4">
                    <Card style = {{ display: 'inline-block' }}>
                        <Card.Content>
                            <Card.Header>
                                Add a Bio
                            </Card.Header>
                            <Card.Description>
                                <Form onSubmit = { this.addBio }>
                                    <Form.Field>
                                        <Input type = 'hidden' name = 'email' value = { this.state.user }/>
                                    </Form.Field>
                                    <Form.Field>
                                        <TextArea placeholder = 'Tell us about yourself' name = 'bio' value = { this.state.bio } onChange = { this.handleChange }/>
                                    </Form.Field>
                                    <Button type = "submit">Add Bio</Button>
                                </Form>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </div>
            </>        
        )
    }
}

export default ProfileComponent;