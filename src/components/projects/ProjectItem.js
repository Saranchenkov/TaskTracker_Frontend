import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import DeveloperModal from "../common/DeveloperModal";
import {isManager} from "../../utility";

class ProjectItem extends Component{

    render() {
        let project = this.props.project;
        return (
            <div className='row align-items-center'>
                <div className='col-8'>
                    <Link to={`/projects/${project.id}/tasks`} className='list-group-item list-group-item-action my-md-1'>{project.name}</Link>
                </div>
                {
                    isManager() ?
                    <div className='col-4'>
                        <span className='i fa fa-user-plus fa-2x mr-2' data-toggle="modal" data-target={`#developerModal${project.id}`}>{}</span>
                        <span className='i fa fa-times fa-2x' onClick={this.props.onDelete}>{}</span>
                    </div> : false
                }
                {isManager() ? <DeveloperModal id={project.id} url={`${this.props.url}/${project.id}`}/> : false}
            </div>
        );
    }
}

export default ProjectItem;