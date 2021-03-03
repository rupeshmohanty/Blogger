import React, { Component } from 'react';
import { Card, Button, Checkbox, Form } from 'semantic-ui-react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import NavbarComponent from './NavbarComponent';

class LoginComponent extends Component{

    constructor(props) {
        super(props);

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            userLoggedIn: false,
            message: ''
        }
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
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost/logreg/login.php', user)
        .then((res) => {
            if(res.data.sent) {
                let responseJson = res.data;
                if(responseJson) {
                    sessionStorage.setItem('userData',responseJson.user);
                    this.setState({ 
                        userLoggedIn: true,
                        message: 'User logged in successfully!'
                    })
                }
            } else {
                this.setState({
                    message: res.data.message
                })
            }
        })
        .catch((error) => console.log(error));
    }


    render() {

        if(this.state.userLoggedIn || sessionStorage.getItem('userData')) {
            return (<Redirect to = { '/dashboard' }/>)
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
                                Login
                            </Card.Header>
                            <Card.Description>
                                <Form onSubmit = { this.onSubmit }>
                                    <Form.Field>
                                        <label>Email</label>
                                        <input type = "email" placeholder = "email" value = { this.state.email } onChange = { this.onEmailChange } name = "email"/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Password</label>
                                        <input type = "password" placeholder = "password" value = { this.state.password } onChange = { this.onPasswordChange } name = "password"/>
                                    </Form.Field>
                                    <Button type = "submit">Login</Button>
                                </Form>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </div>
            </>
        );
    }

}

export default LoginComponent;