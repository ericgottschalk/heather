import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Projects from './pages/Projects';
import Project from './pages/Project';
import MyProjects from './pages/MyProjects';
import NewProject from './pages/NewProject';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import EditProject from './pages/EditProject';
import ProjectNotFound from './errorPages/ProjectNotFound';
import './styles/index.css';

class App extends React.Component {
    render() {
        return (
            <div>
                <Layout>
                    <Router>
                        <Switch>
                            <Route path='/' exact component={Home} />
                            <Route path='/login' exact component={Login} />
                            <Route path='/register' exact component={Register} />
                            <Route path='/projects' exact component={Projects} />
                            <Route path='/edit-profile' exact component={EditProfile} />
                            <Route path='/edit-project/:hash' exact component={EditProject} />
                            <Route path='/my-projects' exact component={MyProjects} />
                            <Route path='/new-project' exact component={NewProject} />
                            <Route path='/user/:username' exact component={Profile} />
                            <Route path='/project/:hash' exact component={Project} />
                            <Route path='/project-not-found' exact component={ProjectNotFound} />
                            <Route component={Home} />
                        </Switch>
                    </Router>
                </Layout>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
