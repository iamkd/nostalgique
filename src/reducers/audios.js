function _parseAudios(audios) {
      let parsed = {};

      let minDate, maxDate;

      let dateList = [];

      parsed.items = audios.map((audio) => {
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
          monthNumber: date.getMonth(),
          season: getSeason(date.getMonth())
        }

        let hasDate = false;
        for (let i = 0; i < dateList.length; i++) {
          if (JSON.stringify(dateList[i]) == JSON.stringify(dateStamp)) {
            hasDate = true;
          }
        }

        if (!hasDate) {
          dateList.push(dateStamp);
        }

        //very stupid idea, but it works!

        let yearMonth = parseFloat(dateStamp.year + '.' + (dateStamp.monthNumber < 10 ? ('0' + String(dateStamp.monthNumber)) : dateStamp.monthNumber));

        if (minDate == null) {
          minDate = Object.assign({}, dateStamp);
        }
        if (maxDate == null) {
          maxDate = Object.assign({}, dateStamp);
        }

        let minYearMonth = parseFloat(minDate.year + '.' + (minDate.monthNumber < 10 ? '0' + String(minDate.monthNumber) : minDate.monthNumber));
        let maxYearMonth = parseFloat(maxDate.year + '.' + (maxDate.monthNumber < 10 ? '0' + String(maxDate.monthNumber) : maxDate.monthNumber));

        if (minYearMonth > yearMonth) {
          minDate = Object.assign({}, dateStamp);
        }
        if (maxYearMonth < yearMonth) {
          maxDate = Object.assign({}, dateStamp);
        }

        audio.dateStamp = dateStamp;

        return audio;
      });

      parsed.minDate = minDate;
      parsed.maxDate = maxDate;
      parsed.dateFilter = maxDate;
      parsed.dateList = dateList.sort((a, b) => {
        let av = parseFloat(a.year + '.' + (a.monthNumber < 10 ? ('0' + String(a.monthNumber)) : a.monthNumber));
        let bv = parseFloat(b.year + '.' + (b.monthNumber < 10 ? ('0' + String(b.monthNumber)) : b.monthNumber));

        if (av < bv) {
          return -1;
        }

        if (av > bv) {
          return 1;
        }

        if (av == bv) {
          return 0;
        }

      });
      return parsed;
    }

let initialState = {
  isFetching: false, 
  items: [], 
  minDate: null, 
  maxDate: null,
  dateList: [] 
};

function audios(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_AUDIOS':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'RECEIVE_AUDIOS':
      let parsed = _parseAudios(action.items);
      console.log(parsed);
      return Object.assign({}, state, {
        isFetching: false,
        ...parsed
      });
    case 'PLAYLIST_SET_FILTER':
      return Object.assign({}, state, {
        dateFilter: action.date
      });
    default:
      return state;
  }
}


export default audios;