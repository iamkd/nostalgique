function _parseAudios(audios) {
      return audios.map((audio) => {
        let date = new Date(audio.date * 1000);

        let getSeason = (month) => {
          if (month >= 0 && month < 2 || month == 11) {
            return 'winter';
          }
          if (month >= 2 && month < 5) {
            return 'spring';
          }
          if (month >= 5 && month < 8) {
            return 'summer';
          }
          if (month >=8 && month < 11) {
            return 'autumn';
          }
        }

        let getMonthName = (month) => {
          let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          return (months[month]);
        }

        let dateStamp = {
          year: date.getFullYear(),
          month: getMonthName(date.getMonth()),
          season: getSeason(date.getMonth())
        }

        audio.dateStamp = dateStamp;

        return audio;
      });
    }

function audios(state = {isFetching: false, items: []}, action) {
  switch (action.type) {
    case 'REQUEST_AUDIOS':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'RECEIVE_AUDIOS':
      return Object.assign({}, state, {
        isFetching: false,
        items: _parseAudios(action.items)
      });
    default:
      return state;
  }
}


export default audios;