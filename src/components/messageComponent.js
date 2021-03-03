import React, { Component } from 'react';

class messageComponent extends Component{

    constructor(props) {
        super(props);

        this.state = {
            message: props.message
        }
    }

    render() {
        if(this.state.message) {
            return(
                <div>
                    { this.state.message }
                </div>
            )
        } else {
            return(
                <div>
                    { this.state.message }
                </div>
            )
        }
    }
}

export default messageComponent;