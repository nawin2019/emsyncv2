import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Login, Signup, UserHome} from './components';
import RoomView from './components/RoomView';
import {QueueElement} from './components/QueueElement';
import {Queue} from './components/Queue';
import {me} from './store';
import SearchForm from './components/SearchForm';
import {UserProfile} from './components/UserProfile';
import {RoomForm} from './components/RoomForm';
import {Landing} from './components/Landing';
import GiphySearch from './components/giphySearch';
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const {isLoggedIn} = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/rooms/:id" component={RoomView} />
        <Route path="/signup" component={Signup} />
        <Route path="/search" component={SearchForm} />
        <Route exact path="/user" component={UserHome} />
        <Route exact path="/add-room" component={RoomForm} />
        <Route exact path="/user/:id" component={UserProfile} />
        <Route exact path="/gifs" component={GiphySearch} />

        {/* Displays our Login component as a fallback */}
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
