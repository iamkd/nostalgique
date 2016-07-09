import React from 'react';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Track';
    }
    render() {
        const {id, artist, title, dateStamp, current, clickedHandler } = this.props;
        
        let name = artist + " - " + title;

        if (name.length > 60) {
          name = name.substring(0, 60) + '...';
        }

        return <div onClick={clickedHandler} className={"track" + (current ? ' active' : '')}>
                  <p className="track-row">
                    <i className="playing-icon fa fa-music"></i>
                    {name} 
                    <span className="track-info">{dateStamp.month + ' ' + dateStamp.year}</span>
                  </p>
               </div>;
    }
}

export default Track;
