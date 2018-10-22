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
            data = data.map(proj => {
                return {
                    id: proj.id,
                    name: proj.name,
                    description: proj.description,
                    coverUrl: proj.media != null && proj.media.lenght > 0 ? proj.media[0] || null : 'http://cdn1.itpro.co.uk/sites/itpro/files/styles/article_main_wide_image/public/2015/11/windows-10-screen.jpg?itok=TutXVc_1',
                    platforms: proj.platformsRaw || [],
                    genre: proj.genre.name
                }
            }) || [];

            this.setState({
                projectsNewest: data,
                loadedProjectsNewest: true
            });
        });

        this.projectService.getTopRated().then(data => { 
            data = data.map(proj => {
                return {
                    id: proj.id,
                    name: proj.name,
                    description: proj.description,
                    coverUrl: proj.media != null && proj.media.lenght > 0 ? proj.media[0] || null : 'http://cdn1.itpro.co.uk/sites/itpro/files/styles/article_main_wide_image/public/2015/11/windows-10-screen.jpg?itok=TutXVc_1',
                    platforms: proj.platformsRaw || [],
                    genre: proj.genre.name
                }
            }) || [];

            this.setState({
                projectsTopRated: data,
                loadedProjectsTopRated: true
            });
        });

        this.projectService.getMostPopular().then(data => { 
            data = data.map(proj => {
                return {
                    id: proj.id,
                    name: proj.name,
                    description: proj.description,
                    coverUrl: proj.media != null && proj.media.lenght > 0 ? proj.media[0] || null : 'http://cdn1.itpro.co.uk/sites/itpro/files/styles/article_main_wide_image/public/2015/11/windows-10-screen.jpg?itok=TutXVc_1',
                    platforms: proj.platformsRaw || [],
                    genre: proj.genre.name
                }
            }) || [];

            this.setState({
                projectsMostPopular: data,
                loadedProjectsMostPopular: true
            });
        });
    }

    render(){
        const { projectsNewest, loadedProjectsNewest, projectsMostPopular, loadedProjectsMostPopular, projectsTopRated, loadedProjectsTopRated } = this.state;
        return (
            <div className='home-content'>
                <div className='home-header'>

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