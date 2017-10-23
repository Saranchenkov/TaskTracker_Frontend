import React, {Component} from 'react';
import $ from 'jquery';
import {request} from '../../utility';
import {getMessage, showMessage} from "../common/Message";

class TaskModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            showMessage: false,
            statusCode: ''
        };
        this.saveTask = this.saveTask.bind(this);
    }

    saveTask(){
        let form = $("#task-form")[0];
        if(form.checkValidity()){
            form.classList.remove("was-validated");
            let newTask = {
                name: $('#task-name').val(),
                description: $('#task-description').val(),
                status: $('#task-status').val()
            };
            request('POST', this.props.url, JSON.stringify(newTask))
                .then(response => {
                    showMessage(this, response.status);
                    if (response.status === 201){
                        return response.json();
                    }
                })
                .then(newTask => {
                    if(newTask){
                        this.props.onSave(newTask);
                    }
                })
        } else {
            form.classList.add("was-validated");
        }
    };

    button = <button type="button"
                        className="btn btn-primary my-2"
                        data-toggle="modal"
                        data-target="#taskModal">
                    Create new task
                </button>;

    render(){
        return (
            <div>
                {this.button}
                <div className="modal fade" id="taskModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">New Task</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="task-form" noValidate>
                                    <div className="form-group">
                                        <label htmlFor="task-name" className="form-control-label">Name:</label>
                                        <input type="text" className="form-control" id="task-name" minLength={1} required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="task-description" className="form-control-label">Description:</label>
                                        <textarea className="form-control" id="task-description" defaultValue={""} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="task-status" className="form-control-label">Status:</label>
                                        <select id="task-status" className="custom-select d-block" required>
                                            <option>WAITING</option>
                                            <option>IMPLEMENTATION</option>
                                            <option>VERIFYING</option>
                                            <option>RELEASING</option>
                                        </select>
                                    </div>
                                </form>
                                {getMessage(this, 'Task', 'created', 'name')}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.saveTask}>Save task</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskModal;