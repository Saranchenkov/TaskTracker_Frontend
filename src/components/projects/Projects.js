import React, { Component } from 'react';
import 'whatwg-fetch';
import {request, isManager} from '../../utility';
import ProjectItem from './ProjectItem';
import Navbar from '../common/Navbar';
import $ from 'jquery';
import {getMessage, showMessage} from "../common/Message";


class Projects extends Component {

    constructor(props){
        super(props);
        this.state = {
            showMessage: false,
            statusCode: '',
            projects: [],
            inputValue: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({inputValue: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.inputValue){
            request('POST', this.props.match.url, this.state.inputValue)
                .then(response => {
                    showMessage(this, response.status);
                    if (response.status === 201){
                        return response.json();
                    }
                })
                .then(newProject => {
                    if(newProject){
                        this.setState((prevState, props) => ({
                            projects: [newProject, ...prevState.projects]
                        }));
                    }
                });
        }
        $('input[type="text"]').select();
    }

    componentDidMount(){
        $('input[type="text"]').focus();
        request('GET', this.props.match.url)
            .then(response => response.json())
            .then(projects => {
                this.setState({
                    projects: projects
                });
            });
    }

    deleteProject = (id) => {
        request('DELETE', `${this.props.match.url}/${id}`)
            .then(response => {
                if(response.ok){
                    console.log(`Project with id: ${id} was deleted`);
                    let projects = this.state.projects.filter(project => project.id !== id);
                    this.setState({
                        projects: projects
                    });
                }
            });
    };

    render() {
        return (
            <div>
                <Navbar history={this.props.history}/>
                <div className="container">
                    <h1 className='display-4 text-center' style={{marginBottom: '2rem', marginTop: '2rem'}}>Projects</h1>
                    {isManager() ?
                        <form className="form-inline my-2 my-md-2" onSubmit={this.handleSubmit}>
                            <input type="text" style={{width: 250}}
                                   onChange={this.handleChange}
                                   placeholder="Enter name of new project"
                                   aria-label="Create"
                                   className="form-control mr-sm-2"/>
                            <button type="submit" className="btn btn-outline-success my-2 my-sm-0">Create</button>
                        </form> : false
                    }

                    <div className='row align-items-center'>
                        <div className='col-5'>
                            {getMessage(this, 'Project', 'saved', 'name')}
                        </div>
                    </div>
                    <div className='list-group'>
                        {this.state.projects.map(
                            project => <ProjectItem project = {project}
                                                    onDelete={this.deleteProject.bind(this, project.id)}
                                                    url={this.props.match.url}
                                                    key={project.id} />)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Projects;