import React from 'react';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Track';
    }
    render() {
        const {id, artist, title, dateStamp, current, clickedHandler, isPlaying } = this.props;
        
        //very long dash
        let name = `${artist} ${String.fromCharCode(8212)} ${title}`;

        if (name.length > 60) {
          name = name.substring(0, 60) + '...';
        }

        let trackClass = 'track';
        if (current) {
          trackClass += ' active';
        }
        if (isPlaying) {
          trackClass += ' is-playing';
        }

        return <div onClick={clickedHandler} className={trackClass}>
                  <p className="track-row">
                    <i className="playing-icon fa fa-music"></i>
                    {name} 
                    <span className="track-info">{dateStamp.month + ' ' + dateStamp.year}</span>
                  </p>
               </div>;
    }
}

export default Track;
