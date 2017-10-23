import React, {Component} from 'react';
import Navbar from '../common/Navbar';
import {request, isManager} from '../../utility';
import Comment from '../comments/Comment';
import CommentModal from '../comments/CommentModal';
import DeveloperModal from '../common/DeveloperModal';

class TaskDetails extends Component{

    constructor(props){
        super(props);
        this.state = {
            task: {
                id: 0,
                name: '',
                description: '',
                status: '',
                developer: null,
                comments: []
            }
        };
        this.addCommentToState = this.addCommentToState.bind(this);
        this.addDeveloperToState = this.addDeveloperToState.bind(this);
    }

    componentDidMount(){
        request('GET', this.props.match.url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(task => {
                if(task){
                    this.setState({task: task});
                }
            })
    }

    updateStatus(status){
        request('PATCH', `${this.props.match.url}/status`, JSON.stringify(status))
            .then(response => {
                if (response.ok){
                    this.setState(prevState => {
                        let task = prevState.task;
                        task.status = status;
                        return task;
                    })
                }
            })
    }

    addCommentToState(newComment){
        console.log('Comment: ', newComment);
        if(newComment){
            this.setState(prevState => {
                let comments = [newComment, ...prevState.task.comments];
                let task = prevState.task;
                task.comments = comments;
                console.log('New task: ', task);
                return {task: task}
            });
        }
    }

    deleteComment(id){
        request('DELETE', `${this.props.match.url}/comments/${id}`)
            .then(response => {
                if(response.ok){
                    console.log(`Comment with id: ${id} was deleted`);
                    console.log('Comments before', this.state.task.comments);
                    let comments = this.state.task.comments.filter(comment => comment.id !== id);
                    let task = this.state.task;
                    task.comments = comments;
                    this.setState({task: task});
                }
            });
    };

    addDeveloperToState(developer){
        this.setState(prevState => {
            let task = prevState.task;
            task.developer = developer;
            console.log(developer);
            return {task: task};
        });
    }

    render() {
        let task = this.state.task;
        console.log(task);
        let statuses = ['WAITING', 'IMPLEMENTATION', 'VERIFYING', 'RELEASING'];
        let editSymbol = <span className={`i fa fa-${task.developer === null ? 'user-plus' : 'pencil'} fa-fw`} data-toggle="modal" data-target="#developerModal">{}</span>;

        return (
            <div style={{marginBottom: '3rem'}}>
                <Navbar history={this.props.history}/>
                <div className="container">
                    <h1 className='display-4 text-center' style={{marginBottom: '2rem', marginTop: '2rem'}}>Task</h1>
                    <div className="card">
                        <div className="card-header">
                            <h4>{task.name}</h4>
                        </div>
                        <div className="card-body">
                            <h4 className="card-title">Description</h4>
                            <p className="card-text">{task.description === '' ? 'none' : task.description}</p>

                            <h4 className="card-title">
                                {'Status '}
                                <div className="dropodown" style={{display: 'inline'}}>
                                    <span className="i fa fa-pencil fa-fw" data-toggle="dropdown">{}</span>
                                    <div className="dropdown-menu">
                                        {statuses.map((status, index) =>
                                            <a key={index} onClick={this.updateStatus.bind(this, status)} className="dropdown-item">{status}</a>
                                        )}
                                    </div>
                                </div>
                            </h4>
                            <p className="card-text">{task.status}</p>
                            {isManager() ?
                                <div>
                                    <h4 className="card-title">
                                        {'Developer '}
                                        {editSymbol}
                                    </h4>
                                    <p className="card-text">{task.developer === null ? 'none' : `${task.developer.firstName} ${task.developer.lastName}`}</p>
                                    <DeveloperModal onAddDeveloper={this.addDeveloperToState}
                                                    url={this.props.match.url}/>
                                </div> : false
                            }
                        </div>
                    </div>
                    <h1 className='display-5 text-center' style={{marginBottom: '1rem', marginTop: '1rem'}}>Comments</h1>
                    <CommentModal onSave={this.addCommentToState} url={this.props.match.url}/>
                    {task.comments.map(
                        (comment, index) => <Comment key={index}
                                                     comment={comment}
                                                     url={this.props.match.url}
                                                     onDelete={this.deleteComment.bind(this, comment.id)}/>)}
                </div>
            </div>
        );
    }
}

export default TaskDetails;