import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class NavbarComponent extends Component{

    constructor(props){
        super(props);

        this.state = {
            loggedinUser: sessionStorage.getItem('userData'),
            activeItem: 'home'
        }
    }

    render() {

        const { activeItem } = this.state

        if(sessionStorage.getItem('userData')) {
            return(
                <Segment inverted>
                    <Menu inverted secondary>
                        <Link to = '/'>
                            <Menu.Item
                                name='home'
                                active={activeItem === 'home'}
                            />
                        </Link>
                        <Link to = '/create-a-blog'>
                            <Menu.Item
                                name='Write a Blog'
                                active={activeItem === 'Write a Blog'}
                            />
                        </Link>
                        <Link to = '/logout'>
                            <Menu.Item
                                name='logout'
                                active={activeItem === 'logout'}
                            />
                        </Link>
                    </Menu>
                </Segment>
            )
        } else {
            return(
                <Segment inverted>
                    <Menu inverted secondary>
                        <Link to = '/'>
                            <Menu.Item
                                name='Login'
                                active={activeItem === 'Login'}
                            />
                        </Link>
                        <Link to = '/register'>
                            <Menu.Item
                                name='Register'
                                active={activeItem === 'Register'}
                            />
                        </Link>
                    </Menu>
                </Segment>
            )
        }
    }
}

export default NavbarComponent;