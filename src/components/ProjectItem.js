import React from 'react';
import { Badge } from 'react-bootstrap';

class ItemHeader extends React.Component {
  render() {
    const { image, headerBadge } = this.props;
    var style = { 
        backgroundImage: 'url(' + image + ')',
    };
    return (
      <header style={style} id={image} className="item-header">
        { headerBadge ? <h4 className="item-header--title">{headerBadge}</h4> : '' }
      </header>
    )
  }
}

class ItemBody extends React.Component {
  render() {
    return (
      <div className="item-body"> 
        <div className="item-title-desc truncate">   
          <h2>{this.props.title}</h2>
          
          <div className='platform-badges'>
            {this.props.platforms.map(platform => {
              return (<Badge className='platform-badge'>{platform.name}</Badge>);
            })}
          </div>
        </div>   
      </div>
    )
  }
}

class ProjectItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      project: props.project
    }
  }

  render() {
    const { project } = this.state;
    return (
      <article className="item" onClick={() => { window.location = '/project/' + project.id }}>
        <ItemHeader image={project.coverUrl} headerBadge={project.genre} />
        <ItemBody title={project.name} text={project.description} platforms={project.platforms} />
      </article>
    );
  }
}

export default ProjectItem;