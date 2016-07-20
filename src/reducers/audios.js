function getSeason(month) {
  if (month >= 0 && month < 2 || month === 11) {
    return 'winter';
  }
  if (month >= 2 && month < 5) {
    return 'spring';
  }
  if (month >= 5 && month < 8) {
    return 'summer';
  }
  if (month >= 8 && month < 11) {
    return 'autumn';
  }
  return 'undefined';
}

function getMonthName(month) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
  return (months[month]);
}

function filterTracks(_audios, dateFilter) {
  let tracks = [];
  if (dateFilter && dateFilter.season === 'winter') {
    if (dateFilter.monthNumber === 11) {
      tracks =
        _audios.filter(track =>
          (track.dateStamp.monthNumber === 0 || track.dateStamp.monthNumber === 1)
          && track.dateStamp.year === dateFilter.year + 1)
        .concat(
          _audios.filter(track =>
            track.dateStamp.monthNumber === 11 && track.dateStamp.year === dateFilter.year)
        );
    } else {
      tracks =
        _audios.filter(track =>
          (track.dateStamp.monthNumber === 0 || track.dateStamp.monthNumber === 1)
          && track.dateStamp.year === dateFilter.year)
        .concat(
          _audios.filter(track =>
            track.dateStamp.monthNumber === 11 && track.dateStamp.year === dateFilter.year - 1)
        );
    }
  } else {
    tracks = _audios
      .filter(track => {
        if (dateFilter) {
          return track.dateStamp.season === dateFilter.season
          && track.dateStamp.year === dateFilter.year;
        }
        return true;
      });
  }
  return tracks;
}

function parseAudios(_audios) {
  const parsed = {};
  const dateList = [];

  let minDate;
  let maxDate;

  parsed.constItems = _audios.map((audio) => {
    const date = new Date(audio.date * 1000);
    const newAudio = { ...audio };

    const dateStamp = {
      year: date.getFullYear(),
      month: getMonthName(date.getMonth()),
      monthNumber: date.getMonth(),
      season: getSeason(date.getMonth()),
    };

    let hasDate = false;
    for (let i = 0; i < dateList.length; i++) {
      if (JSON.stringify(dateList[i]) === JSON.stringify(dateStamp)) {
        hasDate = true;
      }
    }

    if (!hasDate) {
      dateList.push(dateStamp);
    }

    // very stupid idea, but it works!

    const yearMonth = parseFloat(
      `${dateStamp.year}.${(dateStamp.monthNumber < 10
        ?
          `0${String(dateStamp.monthNumber)}`
        :
          dateStamp.monthNumber)}`
    );

    if (minDate == null) {
      minDate = Object.assign({}, dateStamp);
    }
    if (maxDate == null) {
      maxDate = Object.assign({}, dateStamp);
    }

    const minYearMonth = parseFloat(`${minDate.year}.${(minDate.monthNumber < 10
      ?
        `0${String(minDate.monthNumber)}`
      :
        minDate.monthNumber)}`
    );

    const maxYearMonth = parseFloat(`${maxDate.year}.${(maxDate.monthNumber < 10
      ?
        `0${String(maxDate.monthNumber)}`
      :
        maxDate.monthNumber)}`
    );

    if (minYearMonth > yearMonth) {
      minDate = Object.assign({}, dateStamp);
    }
    if (maxYearMonth < yearMonth) {
      maxDate = Object.assign({}, dateStamp);
    }

    newAudio.dateStamp = dateStamp;

    return newAudio;
  });

  parsed.items = filterTracks(parsed.constItems, maxDate);
  parsed.minDate = minDate;
  parsed.maxDate = maxDate;
  parsed.dateFilter = maxDate;
  parsed.dateList = dateList.sort((a, b) => {
    const av = parseFloat(`${a.year}.${a.monthNumber < 10
      ? `0${String(a.monthNumber)}` : a.monthNumber}`);
    const bv = parseFloat(`${b.year}.${b.monthNumber < 10
      ? `0${String(b.monthNumber)}` : b.monthNumber}`);

    if (av < bv) {
      return -1;
    }
    if (av > bv) {
      return 1;
    }

    return 0;
  });
  return parsed;
}

const initialState = {
  isFetching: false,
  constItems: [],
  items: [],
  minDate: null,
  maxDate: null,
  dateList: [],
};

function audios(state = initialState, action) {
  let parsed = [];

  if (action.type === 'RECEIVE_AUDIOS') {
    parsed = parseAudios(action.items);
  }

  switch (action.type) {
    case 'REQUEST_AUDIOS':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'RECEIVE_AUDIOS':
      return Object.assign({}, state, {
        isFetching: false,
        ...parsed,
      });
    case 'PLAYLIST_SET_FILTER':
      return Object.assign({}, state, {
        dateFilter: action.date,
        items: filterTracks(state.constItems, action.date),
      });
    default:
      return state;
  }
}

export default audios;
