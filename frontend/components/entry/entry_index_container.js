import { connect } from 'react-redux';

import EntryIndex from './entry_index';
import { fetchEntries, fetchFeedEntries } from '../../actions/entry_actions';
import { selectEntries } from '../../reducers/selectors';
import { createFollow, destroyFollow } from '../../actions/follow_actions';
// import { selectFeedEntries } from '../../reducers/selectors';

const mapStateToProps = ({ entries, session, users }, { match, location }) => {
  let sortEntries = entries.allEntries;
  const writers = users.allUsers;

  // If user is viewing their feed, check to make sure entries are only from writers they follow
  if (location.pathname === '/feed' && writers) {
    const followWriters = [];
    const followEntries = {};

    // Collect the list of writer's the user is following
    for (let id in writers) {
      writers[id].following ? followWriters.push(id) : null;
    }

    // Select entries from writers the author is following
    for (let id in sortEntries) {
      let entryWriterId = String(sortEntries[id].writer_id);
      if (followWriters.includes(entryWriterId)) {
        followEntries[id] = sortEntries[id];
      }
    }
    sortEntries = followEntries;
  }

  sortEntries = selectEntries(sortEntries).slice(0, -1);
  sortEntries.sort((a, b) => b.id - a.id);

  return {
    entries: sortEntries,
    pathUsername: match.params.username,
    pathname: location.pathname,
    currentUser: session.currentUser[Object.keys(session.currentUser)[0]],
    currentWriter: users.current,
    writers: users.allUsers,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchEntries: username => dispatch(fetchEntries(username)),
  fetchFeedEntries: id => dispatch(fetchFeedEntries(id)),
  createFollow: followRequest => dispatch(createFollow(followRequest)),
  destroyFollow: unfollowRequest => dispatch(destroyFollow(unfollowRequest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EntryIndex);
