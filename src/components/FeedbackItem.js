import React from 'react';

class FeedbackObj extends React.Component {

  render() {
    return (
      <div className="feedback-content">
        <div className="feedback-item item-label">
          <div>
          <p className=""><strong>{new Date(this.props.feedback.dateCreate).toLocaleDateString()}</strong> by: {this.props.feedback.user.username}{ this.props.feedback.user.verified ? <i className="fas fa-check" alt='Verified'></i> : ''}</p>
          </div>
          <div className="spacer2"></div>
          <div className='item-context'>
            <p>Rank: {this.props.feedback.rank}</p>
          </div>
          <div className="spacer"></div>
          <div className="label-description">
            <p>Text: {this.props.feedback.text}</p>
          </div>
        </div>
      </div>
    )
  }
}

class FeedbackItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        feedback: props.feedback
    }
  }

  render() {
    const { feedback } = this.state;
    return (
      <article className="feedback-item">
        <FeedbackObj feedback={feedback} />
      </article>
    );
  }
}

export default FeedbackItem;