import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Card, Icon, Button, Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {Loading} from './Loading';

const Extra = props => {
  return (
    <div>
      <Icon color="white" name="user" />
      {props.listeners} Listeners
      <Link to={`/rooms/${props.id}`}>
        <Button content="Join" icon="right arrow" labelPosition="right" />
      </Link>
    </div>
  );
};

//really want to implement a dimmer here (see semantic ui)

const RoomSingleCard = props => {
  return props.room ? (
    <Card centered raised={true}>
      <Image
        src={props.room.imageUrl}
        size="small"
        fluid
        verticalAlign="middle"
        centered={true}
      />
      {/* <img
        src={props.room.imageUrl}
        alt="room image"
        height={225}
        width={225}
      /> */}
      <Card.Content>
        <Card.Header>{props.room.name}</Card.Header>
        <Card.Description>{props.room.description}</Card.Description>
        {!props.room.allowAdd && (
          <Icon className="block" size="small" name="minus circle" />
        )}
        <Card.Content extra>
          {props.room.users ? (
            <Extra listeners={props.room.users.length} id={props.room.id} />
          ) : (
            <Extra listeners={0} id={props.room.id} />
          )}
        </Card.Content>
      </Card.Content>
    </Card>
  ) : (
    <p>Loading</p>
  );
};

export default RoomSingleCard;
