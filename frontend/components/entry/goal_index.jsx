import React from 'react';
import GoalIndexItem from './goal_index_item';

// const isEmpty = object => {
//   for(let key in object) {
//     if (object.hasOwnProperty(key)) {
//       return true;
//     }
//   }
//   return false;
// };

const isEmpty = obj => {
  for(let key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
};

class GoalIndex extends React.Component {
  componentDidMount() {
    const entry_id = { entry_id: this.props.entryId };
    this.props.fetchGoals(entry_id);
  }

  waitingToLoad() {
    return (
      <div>Loading goals...</div>
    );
  }

  showGoals() {
    const { goals } = this.props;
    return (
      <div>
        { isEmpty(goals.allGoals) ? <div /> : <section><h2>three main goals</h2></section> }
        {goals.map(goal => <GoalIndexItem key={goal.id} goal={goal} />)}
      </div>
    );
  }

  render() {
    if (this.props.goals) {
      return (this.showGoals());
    } else {
      return (this.waitingToLoad());
    }
  }
}

export default GoalIndex;
