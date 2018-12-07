import React from 'react';
import FeedbackItem from './FeedbackItem';
import '../styles/item.css';


class FeedbackList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            feedbacks: props.feedbacks || []
        };
    }

    render() {
        const { feedbacks } = this.state;
        return (
            <div className='project-item-list'>
                {feedbacks.map((feedback) => {  
                    return (<FeedbackItem feedback={feedback}  />)
                })}
            </div>
        );
    }
}

export default FeedbackList;