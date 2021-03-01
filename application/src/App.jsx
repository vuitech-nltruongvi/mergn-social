// Libraries
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container} from 'semantic-ui-react';

// Semantic css 
import 'semantic-ui-css/semantic.min.css';

// Global scss
import './assets/styles/index.scss';

// Module
import './App.css';

// React context
import {AuthContext, AuthProvider} from './context/auth';

// Components
import MenuBar from './components/MenuBar';

// Page
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import SinglePost from './pages/SinglePost';

// Utils
import AuthRoot from './utils/AuthRoot';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Container>
                    <MenuBar />
                    <Route exact path='/' component={Home} />
                    <AuthRoot exact path='/login' component={Login} />
                    <AuthRoot exact path='/register' component={Register} />
                    <Route exact path='/posts/:postId' component={SinglePost} />
                </Container>
            </Router>
        </AuthProvider>
    );
}

export default App;
