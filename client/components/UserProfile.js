import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, Header} from 'semantic-ui-react';
import RoomSingleCard from './roomSingleCard';
import {RoomsList} from './RoomsList';
import {fetchRooms} from '../store/rooms';
import {fetchUser} from '../store/user';
import {Icon, Label} from 'semantic-ui-react';
class UnconnectedUserProfile extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  async componentDidMount() {
    this.props.fetchRooms();
    const user = await this.props.fetchUser();
    this.setState({
      user
    });
  }
  render() {
    return (
      this.props.rooms && (
        <div>
          <Header as="h1" icon textAlign="center">
            {this.state.user.name}
            <br />
            <Image centered src={this.state.user.imageUrl} circular />
          </Header>
          <Header as="h2" icon textAlign="center">
            <Label>
              <Icon name="thumbs up outline" /> 23
            </Label>
            <Label>
              <Icon name="thumbs down outline" /> 23
            </Label>
          </Header>
          <Header as="h2" textAlign="center">
            {this.props.user.id === this.state.user.id
              ? 'Your rooms:'
              : 'Created rooms:'}
          </Header>
          <RoomsList rooms={this.props.rooms} user={this.state.user} />
        </div>
      )
    );
  }
}

const mapState = state => {
  const rooms = state.rooms.filter(room => {
    console.log(room.createdBy);
    console.log(state.user.id);
    return room.createdBy === state.user.id;
  });

  console.log(rooms);
  return {
    rooms,
    user: state.user
  };
};

const mapDispatch = (dispatch, ownProps) => ({
  fetchRooms: () => dispatch(fetchRooms()),
  fetchUser: () => dispatch(fetchUser(ownProps.match.params.id))
});

export const UserProfile = connect(mapState, mapDispatch)(
  UnconnectedUserProfile
);
