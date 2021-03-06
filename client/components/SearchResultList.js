import React from 'react';
import {QueueElement} from './QueueElement';
import propTypes from 'prop-types';

//all clickcable elements thrown by the spotify search before this.
//Room id should come from props

export const SearchResultList = props => {
  {
    console.log('time?: ', props.spotifyResult[0].duration_ms);
  }
  return (
    <div>
      {props.spotifyResult.map(song => (
        <QueueElement
          spotifyLink={song.uri}
          imageUrl={song.album.images[song.album.images.length - 1].url}
          imagePlayerURL={song.album.images[0].url}
          key={song.id}
          trackName={song.name}
          artistName={song.artists[0].name}
          comingFrom={'search'}
          duration={song.duration_ms}
        />
      ))}
    </div>
  );
};

SearchResultList.propTypes = {
  // roomId:propTypes.number.isRequired,
};
