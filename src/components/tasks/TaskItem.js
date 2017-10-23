import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {isManager} from "../../utility";

class TaskItem extends Component{

    render() {
        return (
            <div className='row align-items-center'>
                <div className='col-8'>
                    <Link to={`${this.props.url}/${this.props.task.id}`} className='list-group-item list-group-item-action my-md-1'>{this.props.task.name}</Link>
                </div>
                {isManager() ?
                    <div className='col-4'>
                        <span className='i fa fa-times fa-2x' onClick={this.props.onDelete}></span>
                    </div> : false
                }
            </div>
        );
    }
}

export default TaskItem;