import React from 'react';
import ReactDOM from 'react-dom';
import Projects from './components/projects/Projects';
import Tasks from './components/tasks/Tasks';
import TaskDetails from './components/tasks/TaskDetails';
import Login from './components/Login';
import Register from './components/Register';
import Confirmation from './components/Confirmation';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {checkAuthentication} from "./utility";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        checkAuthentication() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
);
const UnauthorizedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        !checkAuthentication() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/',
                state: { from: props.location }
            }}/>
        )
    )}/>
);



ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <PrivateRoute path="/projects/:projectId/tasks/:taskId" component={TaskDetails}/>
            <PrivateRoute path="/projects/:projectId/tasks" component={Tasks}/>
            <PrivateRoute path="/projects" component={Projects}/>
            <UnauthorizedRoute path="/login" component={Login}/>
            <UnauthorizedRoute path="/register" component={Register}/>
            <UnauthorizedRoute path="/confirm/:id" component={Confirmation}/>

            <Redirect from="/" to="/projects"/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();


