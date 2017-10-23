import React, {Component} from 'react';

class Message extends Component{

    constructor(){
        super();
        this.state = {
            message: {
                text: '',
                className: ''
            }
        };
    }

    componentDidMount(){
        this.initMessage(this.props.statusCode);
    }

    initMessage(code){
        console.log(`Code: ${code}`);
        switch (code){
            case 200:
                this.setState({message: {
                    text: `${this.props.item} was successfuly ${this.props.successAction} !`,
                    className: 'alert-success'
                }});
                break;
            case 201:
                this.setState({message: {
                    text: `${this.props.item} was successfuly ${this.props.successAction} !`,
                    className: 'alert-success'
                }});
                break;
            case 409:
                this.setState({message: {
                    text: `${this.props.item} with such ${this.props.conflictParam} is already exist !`,
                    className: 'alert-danger'
                }});
                break;
            case 401:
                this.setState({message: {
                    text: 'Incorrect email or password !',
                    className: 'alert-danger'
                }});
                break;
            default:
                this.setState({message: {
                    text: 'An error has occurred. Please, try again !',
                    className: 'alert-danger'
                }})
        }
    }

    render(){
        return (
            <div className={`alert ${this.state.message.className} alert-dismissible fade show`} style={{marginBottom: '0rem'}} role="alert">
                {this.state.message.text}
            </div>
        );
    }
}

function showMessage(component, statusCode){
    component.setState({
        showMessage: true,
        statusCode: statusCode
    });
    setTimeout(() => {component.setState({showMessage: false})}, 3000);
}

function getMessage(component, itemName, successAction, conflictParam) {
    return component.state.showMessage === true ?
        <Message item={itemName}
                 statusCode={component.state.statusCode}
                 conflictParam={conflictParam}
                 successAction={successAction}
        /> : false;
}

export default Message;
export {showMessage, getMessage};