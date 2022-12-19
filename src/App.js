import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './views/user/dashboard/dashboard';
import Login from './views/user/login/login';
import Signup from './views/user/signup/signup';

class App extends Component{

    state = {
        is_logged_in: false
    }

    login = () => this.setState({is_logged_in: true});

    signup = () => this.setState({is_logged_in: true});

    logout = () => this.setState({is_logged_in: false});

    render(){
        const { is_logged_in } = this.state;

        return(
            <Routes>
                <Route path="/" element={!is_logged_in? <Login login={this.login}/>:<Navigate to="/dashboard"/>}/>
                <Route path="signup" element={!is_logged_in? <Signup signup={this.signup}/>: <Navigate to="/dashboard"/>}/>
                <Route path="dashboard" element={is_logged_in? <Dashboard logout={this.logout}/>:<Navigate to="/"/>}/>
            </Routes>
        )
    }
}

export default App;