import React from 'react';
import LoginService from '../services/LoginService';
import ProjectList from '../components/ProjectList';
import ProjectService from '../services/ProjectService';
import { Tabs, Tab } from 'react-bootstrap';
import '../styles/home.css';

class Home extends React.Component {
    constructor(props){
        super(props);

        this.loginService = new LoginService();
        this.projectService = new ProjectService();

        this.state = {
            projectsNewest: [],
            projectsMostPopular: [],
            projectsTopRated: [],
            loadedProjectsNewest: false,
            loadedProjectsMostPopular: false,
            loadedProjectsTopRated: false
        };  
    }

    componentDidMount(){
        this.projectService.getNewest().then(data => { 
            var projects = this.projectService.map(data);

            this.setState({
                projectsNewest: projects,
                loadedProjectsNewest: true
            });
        });

        this.projectService.getTopRated().then(data => { 
            var projects = this.projectService.map(data);

            this.setState({
                projectsTopRated: projects,
                loadedProjectsTopRated: true
            });
        });

        this.projectService.getMostPopular().then(data => { 
            var projects = this.projectService.map(data);

            this.setState({
                projectsMostPopular: projects,
                loadedProjectsMostPopular: true
            });
        });
    }

    render(){
        const { projectsNewest, loadedProjectsNewest, projectsMostPopular, loadedProjectsMostPopular, projectsTopRated, loadedProjectsTopRated } = this.state;
        return (
            <div className='home-content'>
                <div className='home-header'>
                    <h1>With Hather you can share, discover, play and contribute.
                       <br></br> It's time to make your project come true!
                       <br></br>Add your project, and shows it to the world! 
                       <br></br><br></br>This is our Indie Game Crowdfunding platform.
                    </h1>
                </div>
                <Tabs defaultActiveKey={1} id="tab-projects" className="projects-tab roxinho">
                    <Tab eventKey={1} title="Newest" animation>
                        <div>
                            { loadedProjectsNewest ? <ProjectList projects={projectsNewest} /> : '' }
                            { loadedProjectsNewest && projectsNewest.length == 0 ? <p className='no-project'>No projects yet</p> : '' }
                        </div>
                    </Tab>                
                    <Tab eventKey={2} title="Top Rated" animation>
                        <div>
                            { loadedProjectsTopRated ? <ProjectList projects={projectsTopRated} /> : '' }
                            { loadedProjectsTopRated && projectsTopRated.length == 0 ? <p className='no-project'>No projects yet</p> : '' }
                        </div>
                    </Tab>
                    <Tab eventKey={3} title="Most Popular" animation>
                        <div>
                            { loadedProjectsMostPopular ? <ProjectList projects={projectsMostPopular} /> : '' }
                            { loadedProjectsMostPopular && projectsMostPopular.length == 0 ? <p className='no-project'>No projects yet</p> : '' }
                        </div>
                    </Tab>
                </Tabs>        
            </div>   
        );
    }
}

export default Home;