import React, {Component} from 'react';
import $ from 'jquery';
import {request} from '../../utility';
import {showMessage, getMessage} from '../common/Message';

class CommentModal extends Component{

    constructor(props){
        super(props);
        this.state = {showMessage: false};
        this.saveComment = this.saveComment.bind(this);
    }

    saveComment(){
        let form = $("#comment-form")[0];
        if(form.checkValidity()){
            form.classList.remove("was-validated");
            let newComment = {
                content: $('#comment-content').val(),
            };
            request('POST', `${this.props.url}/comments`, JSON.stringify(newComment))
                .then(response => {
                    showMessage(this, response.status);
                    if (response.status === 201){
                        return response.json();
                    }
                })
                .then(newComment => {
                    if(newComment){
                        this.props.onSave(newComment);
                    }
                })
        } else {
            form.classList.add("was-validated");
        }
    };

    button = <button type="button"
                     className="btn btn-primary my-2"
                     data-toggle="modal"
                     data-target="#commentModal">
                     New comment
            </button>;

    render(){
        return (
            <div>
                {this.button}
                <div className="modal fade" id="commentModal" tabIndex={-1} role="dialog" aria-labelledby="commentModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="commentModal">New comment</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="comment-form" noValidate>
                                    <div className="form-group">
                                        <label htmlFor="comment-content" className="form-control-label">Text:</label>
                                        <textarea className="form-control" id="comment-content" required />
                                    </div>
                                </form>
                                {getMessage(this, 'Comment', 'saved')}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.saveComment}>Save comment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CommentModal;