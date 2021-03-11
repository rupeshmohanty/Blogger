import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

// semantic ui
import { Card, Image, Button, Item } from 'semantic-ui-react';

// import images
import dp from '../images/dp.jpg';

// import components 
import NavbarComponent from './NavbarComponent';

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
        .then(res => {
            this.setState({
                posts: res.data
            })
        })
        .catch(error => console.log(error));
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
                                        {
                                            this.state.user["bio"] ? (
                                                <Card.Description>
                                                    <h4>Bio</h4>
                                                    { this.state.user["bio"] }
                                                </Card.Description>
                                            ) : (
                                                <Card.Description>
                                                    <Link to = '/profile'><Button secondary>Add a Bio</Button></Link>
                                                </Card.Description>
                                            )
                                        }
                                    </Card.Content>
                                </Card>
                            </div>
                            <div className = "col-md-8">
                                <Item.Group>
                                    { this.state.posts && this.state.posts.map((post) => (
                                        <Card style = {{ width: '100%' }}>
                                            <Card.Content>
                                                <Item>
                                                    <Item.Content>
                                                        <Card.Header>
                                                            { post.title }
                                                        </Card.Header>
                                                        <Item.Meta>
                                                            By {
                                                                post.email
                                                            }
                                                        </Item.Meta><br/>
                                                        <Item.Description>
                                                            { post.brief }
                                                        </Item.Description>
                                                        <Link to = { '/blog/' + post.id }>
                                                            See details
                                                        </Link>
                                                    </Item.Content>
                                                </Item>
                                            </Card.Content>
                                        </Card>
                                    )) }
                                </Item.Group>
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

export default DashboardComponent;