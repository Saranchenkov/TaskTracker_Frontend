import React, {Component} from 'react';
import {publicRequest} from "../utility";

class Confirmation extends Component{

    componentDidMount(){
        let id = window.atob(this.props.match.params.id);
        publicRequest('PATCH', '/confirm', JSON.stringify(id))
            .then(response => {
                if(response.ok){
                    this.props.history.push('/login');
                }
            });
    }

    render(){
        return(
            <div className="container">
                <h1>Confirmation ...</h1>
            </div>

        )
    }
}

export default Confirmation;