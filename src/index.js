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
import MyProjects from './pages/MyProjects';
import NewProject from './pages/NewProject';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
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
                            <Route path='/profile' exact component={EditProfile} />
                            <Route path='/my-projects' exact component={MyProjects} />
                            <Route path='/new-project' exact component={NewProject} />
                            <Route path='/user/:username' exact component={Profile} />
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
