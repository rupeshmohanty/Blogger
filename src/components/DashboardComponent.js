import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

// semantic ui
import { Card, Image, Button } from 'semantic-ui-react';

// import images
import dp from '../images/dp.jpg';

// import components 
import NavbarComponent from './NavbarComponent';
import BlogComponent from './BlogComponent';

class DashboardComponent extends Component{

    constructor(props) {
        super(props);

        this.state = {
            loggedInUser: sessionStorage.getItem('userData'),
            user: [],
            posts: [],
            message: ''
        }
    }

    componentWillMount() {
        // getting posts from database!
        axios.get('http://localhost/logreg/showBlogs.php')
        .then(res => res.json())
        .then(json => {
            this.setState({
                posts: json
            })
        })
        .catch(error => console.log(error))
    }

    componentDidMount() {
        // getting user!
        axios.get('http://localhost/logreg/getUser.php?user=' + this.state.loggedInUser)
        .then((res) => {
            if(res.data.sent) {
                this.setState({
                    user: res.data.userdata
                })
            } else {
                this.setState({
                    message: res.data.message
                })
            }
        })
    }

    render() {

        if(this.state.user["bio"]) {
            if(sessionStorage.getItem('userData')) {
                return(
                    <>
                        <NavbarComponent/>
                        <div className = "container">
                            <div className = "row">
                                <div className = "col-md-4">
                                    <Card>
                                        <Image src = { dp } wrapped ui = {false} width = "300" height = "300"/>
                                        <Card.Content>
                                            <Card.Header>
                                                { this.state.user["name"] }
                                            </Card.Header>
                                            <Card.Meta>
                                                <span className='email'>{ this.state.loggedInUser }</span>
                                            </Card.Meta><br/>
                                            <Card.Description>
                                                { this.state.user["bio"] }
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                </div>
                                <div className = "col-md-8">
                                    <BlogComponent post = { this.state.posts }/>
                                </div>
                            </div>
                        </div>
                    </>
                    
                )
    
            } else {
                return(<Redirect to = {'/'}/>)
            }
        } else {
            if(sessionStorage.getItem('userData')) {
                return(
                    <>
                        <NavbarComponent/>
                        <div className = "container">
                            <div className = "row">
                                <div className = "col-md-4">
                                    <Card>
                                        <Image src = { dp } wrapped ui = {false} width = "300" height = "300"/>
                                        <Card.Content>
                                            <Card.Header>
                                                { this.state.user["name"] }
                                            </Card.Header>
                                            <Card.Meta>
                                                <span className='email'>{ this.state.loggedInUser }</span>
                                            </Card.Meta><br/>
                                            <Card.Description>
                                                <Link to = '/profile'><Button secondary>Add a Bio</Button></Link>
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                </div>
                                <div className = "col-md-8">
    
                                </div>
                            </div>
                        </div>
                    </>
                    
                )
    
            } else {
                return(<Redirect to = {'/'}/>)
            }
        }
        
    }
}

export default DashboardComponent;