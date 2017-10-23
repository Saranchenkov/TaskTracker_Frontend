import React, {Component} from 'react';
import $ from 'jquery';
import {request} from "../../utility";

class Comment extends Component{

    constructor(props){
        super(props);
        this.state = {
            comment: this.props.comment
        };
        this.toggleComment = this.toggleComment.bind(this);
        this.updateComment = this.updateComment.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({comment: nextProps.comment});
    }

    toggleComment(){
        $(`#comment${this.props.comment.id}`).toggle();
        $(`#edit${this.props.comment.id}`).toggle();
        let textField = $(`#textField${this.state.comment.id}`);
        textField.val(this.state.comment.content);
        textField.removeClass("is-invalid");
        textField.focus();
    }

    updateComment(){
        let textField = $(`#textField${this.state.comment.id}`);
        let content = textField.val();
        textField.removeClass("is-invalid");
        if(content) {
            request('PATCH', `${this.props.url}/comments/${this.state.comment.id}/content`, content)
                .then(response => {
                    if (response.ok) {
                        let comment = this.state.comment;
                        comment.content = content;
                        this.setState({comment: comment});
                        this.toggleComment();
                    }
                });
        } else {
            textField.addClass("is-invalid");
        }
    }

    render(){
        return (
            <div className="card my-2">
                <div className="card-body"  id={`comment${this.state.comment.id}`}>
                    <div className="text-right">
                        <span className="i fa fa-pencil mx-1" style={{fontSize: '1.5em'}} onClick={this.toggleComment}>{}</span>
                        <span className="i fa fa-times mx-1" style={{fontSize: '1.5em'}} onClick={() => this.props.onDelete()}>{}</span>
                    </div>
                    <blockquote className="blockquote" style={{marginBottom: '0rem', fontSize: '1rem'}} >
                        <p style={{marginBottom: '0rem'}}>{this.state.comment.content}</p>
                    </blockquote>
                </div>
                <div className="card-body" style={{display: 'none'}} id={`edit${this.state.comment.id}`}>
                    <form id="editForm">
                        <textarea id={`textField${this.state.comment.id}`} className="form-control mb-2" autoFocus rows={3} style={{resize: 'none', marginRight: '0rem'}} defaultValue={this.state.comment.content} />
                        <button type="button" className="btn btn-outline-primary mr-2" onClick={this.updateComment}>Save</button>
                        <button type="button" className="btn btn-outline-secondary" onClick={this.toggleComment}>Cancel</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Comment;