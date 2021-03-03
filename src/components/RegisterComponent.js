import React, { Component } from 'react';
import { Card, Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import NavbarComponent from './NavbarComponent';
 
class RegisterComponent extends Component{
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            userRegistered: false,
            message: ''
        }
    }

    onNameChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    onEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }

    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost/logreg/register.php', user)
        .then(res => {
            if(res.data.sent) {
                this.setState({
                    userRegistered: true,
                    message: 'User registered successfully!'
                })
            } else {
                this.setState({
                    message: res.data.message
                })
            }
        })
        .catch(error => console.log(error));
    }

    render() {

        if(this.state.userRegistered){
            return(<Redirect to = {'/'}/>)
        }

        if(sessionStorage.getItem('userData')) {
            return(<Redirect to = {'/dashboard'}/>)
        }

        return(
            <>
                <NavbarComponent/>
                <div className = "container text-center mt-4">
                    <div style = {{ color: 'red' }}>
                        { this.state.message }
                    </div>
                    <Card style = {{ display: 'inline-block' }}>
                        <Card.Content>
                            <Card.Header>
                                Register
                            </Card.Header>
                            <Card.Description>
                                <Form onSubmit = { this.onSubmit }>
                                    <Form.Field>
                                        <label>Name</label>
                                        <input type = "text" placeholder = "Name" value = { this.state.name } onChange = { this.onNameChange } name = "name"/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Email</label>
                                        <input type = "email" placeholder = "email" value = { this.state.email } onChange = { this.onEmailChange } name = "email"/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Password</label>
                                        <input type = "password" placeholder = "password" value = { this.state.password } onChange = { this.onPasswordChange } name = "password"/>
                                    </Form.Field>
                                    <Button type = "submit">Register</Button>
                                </Form>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </div>
            </>
        )
    }
}

export default RegisterComponent;