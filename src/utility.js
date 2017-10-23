import 'whatwg-fetch';
import {Config} from './config';
import decode from 'jwt-decode';

const publicRequest = (method, path, body) => {
    let url = Config.domain + path;
    let options = {
        method: method,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    };
    let token = localStorage.getItem('token');
    if(token){
        options.headers['Authorization'] = `Bearer ${token}`;
    }
    if (body) {
        options.body = body;
    }
    return fetch(new Request(url, options));
};

const request = (method, path, body) => {
    if(checkAuthentication()){
        return publicRequest(method, path, body);
    }
};

const checkAuthentication = () => {
    let token = localStorage.getItem('token');
    if(token){
        let exp = decode(token).exp;
        return (Date.now()/1000) < exp;
    }
    return false;
};

const signout = () => {
    localStorage.removeItem('token');
};

const authenticate = (authHeader, history) => {
  let token = authHeader.replace('Bearer ', '');
  localStorage.setItem('token', token);
  history.push('/');
};

const getRole = () => {
    let token = localStorage.getItem('token');
    if(token){
        let role = decode(token).role;
        return role.replace('ROLE_', '');
    }
    return false;
};

const isDeveloper = () => {
    let role = getRole();
    if(role){
        if(role === 'DEVELOPER') return true;
    }
    return false;
};

const isManager = () => {
    let role = getRole();
    if(role){
        if(role === 'MANAGER') return true;
    }
    return false;
};

export {request, authenticate, checkAuthentication, signout, publicRequest, isDeveloper, isManager};