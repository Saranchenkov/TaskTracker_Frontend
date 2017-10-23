import React, {Component} from 'react';
import $ from 'jquery';
import {request} from '../../utility';
import {getMessage, showMessage} from "./Message";

class DeveloperModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            developers: []
        };
        this.searchDevelopers = this.searchDevelopers.bind(this);
    }

    handleFirstNameChange(event){
        this.setState({firstName: event.target.value.trim()}, this.searchDevelopers);
    }

    handleLastNameChange(event){
        this.setState({lastName: event.target.value.trim()}, this.searchDevelopers);
    }

    searchDevelopers(){
        if(this.state.firstName.length > 0 || this.state.lastName.length > 0){
            request('GET', `/users/search?first=${this.state.firstName}&last=${this.state.lastName}`)
                .then(response => {
                    return response.status === 200 ? response.json() : [];
                })
                .then(developers => {
                    console.log(developers);
                    if(developers){
                        this.setState({developers: developers});
                    }
                });
        } else {
            this.setState({developers: []});
        }
    }

    addDeveloper(){
        let id = $('.list-group-item.active').attr('id');
        if (id) {
            let developer = this.state.developers.find(developer => developer.id.toString() === id.toString());
            request('PATCH', `${this.props.url}/developer`, JSON.stringify(id))
                .then(response => {
                    showMessage(this, response.status);
                    if (response.ok && this.props.onAddDeveloper) {
                        this.props.onAddDeveloper(developer);
                    }
                });
        }
    }

    render(){
        return (
            <div>
                {this.button}
                <div className="modal fade" id={`developerModal${this.props.id ? this.props.id : ''}`} tabIndex={-1} role="dialog" aria-labelledby="developerModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={{minHeight: '300px'}}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="developerModalLabel">Searching for developer</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form className="mb-2">
                                    <div className="form-row">
                                        <div className="col">
                                            <input id="firstName" type="text" autoComplete="off" className="form-control" placeholder="First name" onChange={this.handleFirstNameChange.bind(this)}/>
                                        </div>
                                        <div className="col">
                                            <input id="lastName" type="text" autoComplete="off" className="form-control" placeholder="Last name" onChange={this.handleLastNameChange.bind(this)}/>
                                        </div>
                                    </div>
                                </form>
                                <div className="list-group mb-2" role="tablist">
                                    {this.state.developers.map((developer, index) =>
                                        <a key={index} id={developer.id} href='#' data-toggle="tab" className="list-group-item list-group-item-action">{`${developer.firstName} ${developer.lastName}`}</a>)}
                                </div>
                                {getMessage(this, 'Developer', 'added')}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary"  onClick={this.addDeveloper.bind(this)}>Add developer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeveloperModal;