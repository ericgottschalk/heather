import React from 'react';
import { Badge } from 'react-bootstrap';
import config from '../config';

class Item extends React.Component {

  render() {
    let style = { 
      backgroundImage: 'url(' + config.ApiUrl + this.props.project.coverUrl + ')',
    };
    return (
      <div className="cell-content">
        <div className="item item-thumbnail" style={style}>
          <div className="thumbnail-pill">
            <p>{this.props.project.genre}</p>
          </div>
        </div>
        <div className="item item-label">
          <div>
            <h2 className="headline truncate">{this.props.project.name}</h2>
          </div>
          <div className="spacer2"></div>
          <div className='item-context platform-badges'>
            {this.props.project.platforms.map(platform => {
              return (<Badge className='platform-badge'>{platform.name}</Badge>);
            })}
          </div>
          <div className="spacer"></div>
          <div className="label-description">
            <p className=""><strong>{this.props.project.date}</strong> by: {this.props.project.username}{ this.props.project.userIsVerified ? <i className="fas fa-check" alt='Verified'></i> : ''}</p>
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
      <article className="item" onClick={() => { window.location = '/project/' + project.hash }}>
        <Item project={project} />
      </article>
    );
  }
}

export default ProjectItem;