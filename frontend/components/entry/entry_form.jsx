import React from 'react';
import update from 'react-addons-update';
import moment from 'moment';
import { makeExpandingArea } from '../../util/helpers';

class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: {
        title: '',
        general: '',
        gratitude: '',
        improvements: '',
        writer_id: this.props.writerId,
        public: true,
      },
      goals: {
        goal1: {
          body: '',
          done: false,
          entry_id: null,
        },
        goal2: {
          body: '',
          done: false,
          entry_id: null,
        },
        goal3: {
          body: '',
          done: false,
          entry_id: null,
        },
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateEntry = this.updateEntry.bind(this);
    this.updateGoals = this.updateGoals.bind(this);
    this.submitGoals = this.submitGoals.bind(this);
    this.pullEntryId = this.pullEntryId.bind(this);
  }

  componentDidMount() {
    this.nameInput.focus();
  }

  pullEntryId(entry) {
    const { goals } = this.state;

    for (const goalId of Object.keys(this.state.goals)) {
      if (goals[goalId].body !== '') {
        this.setState(update(
          this.state,
          { goals: { [goalId]: { entry_id: { $set: entry.current.id } } } }));
      }
    }
    return this.state;
  }

  submitGoals(createdEntry) {
    const { goals } = this.state;
    const { createGoal } = this.props;
    let captureGoal;

    for (const goalId of Object.keys(this.state.goals)) {
      if (goals[goalId].body !== '') {
        captureGoal = createGoal(createdEntry.goals[goalId]);
      }
    }
    return captureGoal; 
  }

  handleSubmit(e) {
    e.preventDefault();

    const { entry, goals } = this.state;
    const { createEntry } = this.props;

    if (entry.general !== '' && goals.goal1.body !== '') {
      createEntry(entry)
        .then(entry => this.pullEntryId(entry))
        .then(createdEntry => this.submitGoals(createdEntry))
        .then(goal => this.props.history.push(`/entries/${goal.current.entry_id}`));
    } else if (entry.general !== '') {
      createEntry(entry)
        .then(entry => this.props.history.push(`/entries/${entry.current.id}`));
    }
  }

  updateEntry(field) {
    return e => (this.setState(update(
      this.state, { entry: { [field]: { $set: e.target.value } } },
    )));
  }

  updateGoals(field) {
    return e => (this.setState(update(
      this.state, { goals: { [field]: { body: { $set: e.target.value } } } },
    )));
  }

  render() {
    const { entry: { title, general, gratitude, improvements } } = this.state;
    const { goals: { goal1, goal2, goal3 } } = this.state;
    const { createEntry, writer } = this.props;
    const date = moment().format("MMM Do");

    return (
      <div className="main-container">
        <article>
          <h1>{date}</h1>
        </article>
        <div className="entry-form">
          <form>
            <textarea ref={(input) => { this.nameInput = input; }}
                      placeholder={`what's on your mind, ${writer}?`}
                      value={general}
                      onChange={this.updateEntry('general')}>
            </textarea>

            <textarea placeholder="what are some things you feel grateful and thankful for?"
                      value={gratitude}
                      onChange={this.updateEntry('gratitude')}>
            </textarea>

            <textarea placeholder="is there anything you wished you had done better or differently today?"
                      value={improvements}
                      onChange={this.updateEntry('improvements')}>
            </textarea>

            <label> 
              <h2>three main things you want to get done tomorrow</h2>
              <input type="text" placeholder="1" value={goal1.body} onChange={this.updateGoals('goal1')} />
              <input type="text" placeholder="2" value={goal2.body} onChange={this.updateGoals('goal2')} />
              <input type="text" placeholder="3" value={goal3.body} onChange={this.updateGoals('goal3')} />
            </label>

            <button onClick={this.handleSubmit} className="entry-form-button entry-submit-button">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default EntryForm;
