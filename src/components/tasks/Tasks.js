import React, { Component } from 'react';
import 'whatwg-fetch';
import {request, isDeveloper} from '../../utility';
import TaskItem from './TaskItem';
import Navbar from '../common/Navbar';
import TaskModal from './TaskModal';
import $ from 'jquery';

class Tasks extends Component {

    constructor(props){
        super(props);
        this.state = {
            tasks: [],
            projectId: props.match.params.projectId,
            filter: 'all'
        };

        this.getURL = this.getURL.bind(this);
        this.showProjects = this.showProjects.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    updateState(newTask) {
        console.log('Task: ', newTask);
        if(newTask){
            this.setState(prevState => ({
                tasks: [newTask, ...prevState.tasks]
            }));
        }
    }

    componentDidMount(){
        console.log('componentDidMount');
        this.showProjects();
    }

    showProjects(){
        request('GET', this.getURL())
            .then(response => {
                return response.json();
            })
            .then(tasks => {
                console.log(tasks);
                this.setState({
                    tasks: tasks
                });
            });
    }

    getURL(){
        return this.state.filter === 'all' ? this.props.match.url : `${this.props.match.url}/filter`;
    }

    handleChangeFilter(){
        if(isDeveloper()){
            let id = $('.btn.btn-outline-info.active').attr('id');
            if (id !== this.state.filter){
                console.log('Change to ', id);
                this.setState({
                    filter: id
                }, this.showProjects);
            }
        }
    }

    deleteTask = (id) => {
        request('DELETE', `${this.props.match.url}/${id}`)
            .then(response => {
                if(response.ok){
                    console.log(`Task with id: ${id} was deleted`);
                    let tasks = this.state.tasks.filter(task => task.id !== id);
                    this.setState({
                        tasks: tasks
                    });
                }
            });
    };

    render() {
        return (
            <div>
                <Navbar history={this.props.history}/>
                <div className="container">
                    <h1 className='display-4 text-center' style={{marginBottom: '2rem', marginTop: '2rem'}}>Tasks</h1>
                    {isDeveloper() ?
                        <div className="row justify-content-left mb-4">
                            <div className="btn-group" data-toggle="buttons">
                                <label onClick={this.handleChangeFilter.bind(this)} id="all" className="btn btn-outline-info active">
                                    <input type="radio" name="options" autoComplete="off" defaultChecked />
                                    All tasks
                                </label>
                                <label onClick={this.handleChangeFilter.bind(this)} id="my" className="btn btn-outline-info">
                                    <input type="radio" name="options" autoComplete="off" />
                                    My tasks
                                </label>
                            </div>
                        </div> : false
                    }

                    <TaskModal onSave={this.updateState} url={this.props.match.url}/>
                    <div className='list-group'>
                        {this.state.tasks.map(
                            task => <TaskItem
                                task={task}
                                url={this.props.match.url}
                                onDelete={this.deleteTask.bind(this, task.id)}
                                key={task.id} />)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Tasks;