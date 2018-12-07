import React from 'react';
import { Badge } from 'react-bootstrap';
import '../styles/card.css';
import config from '../config';

class CardHeader extends React.Component {
  render() {
    const { image, headerBadge } = this.props;
    var style = { 
        backgroundImage: 'url(' + config.ApiUrl + image + ')',
    };
    return (
      <header style={style} id={image} className="card-header">
        { headerBadge ? <h4 className="card-header--title">{headerBadge}</h4> : '' }
      </header>
    )
  }
}

class Button extends React.Component {
  render() {
    return (
      <button className="button button-primary">
        <i className="fa fa-chevron-right"></i> See more...
      </button>
    )
  }
}

class CardBody extends React.Component {
  render() {
    return (
      <div className="card-body">       
        <h2>{this.props.title}</h2>
        
        <p className="body-content">{this.props.text}</p>
        
        <div className='platform-badges'>
          {this.props.platforms.map(platform => {
            return (<Badge className='platform-badge'>{platform.name}</Badge>);
          })}
        </div>
        <Button />
      </div>
    )
  }
}

class ProjectCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      project: props.project
    }
  }

  render() {
    const { project } = this.state;
    return (
      <article className="card" onClick={() => { window.location = '/project/' + project.hash }}>
        <CardHeader image={project.coverUrl} headerBadge={project.genre} />
        <CardBody title={project.name} text={project.description} platforms={project.platforms} />
      </article>
    );
  }
}

export default ProjectCard;