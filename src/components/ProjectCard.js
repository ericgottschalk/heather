import React from 'react';
import '../styles/card.css';

class CardHeader extends React.Component {
  render() {
    const { image, headerBadge } = this.props;
    var style = { 
        backgroundImage: 'url(' + image + ')',
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
      <article className="card">
        <CardHeader image={project.coverUrl} headerBadge='Test' />
        <CardBody title={project.name} text={project.description}/>
      </article>
    );
  }
}

export default ProjectCard;