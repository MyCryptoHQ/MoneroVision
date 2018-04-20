import * as moment from 'moment';

export const calculateAge = (start: string) => {
  // Dates should be calculated in unix due to weird issue with firefox parsing dates
  const timestampUTC = new Date(parseInt(start, 10) * 1000);
  const nowUTC = new Date().toUTCString();
  const diffMs = +new Date(nowUTC) - +timestampUTC;
  const diffDays = Math.floor(diffMs / 86400000); // days
  const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  const diffSecs = Math.round(diffMs / 1000); // seconds
  return !!diffDays
    ? diffDays + 'd'
    : !!diffHrs
      ? diffHrs + 'h'
      : !!diffMins
        ? diffMins + 'm'
        : diffSecs + 's';
};

export const toKB = (bytes: number | string) => {
  let bytesInt: number;
  typeof bytes === 'string' ? (bytesInt = parseInt(bytes, 10)) : (bytesInt = bytes);
  return bytesInt / 1000 + ' kB';
};

export const formatApiDateStrings = (str: string) => {
  return moment
    .unix(parseInt(str, 10))
    .utc()
    .format('YYYY / MM / DD – HH:MM UTC');
};

export const createReducer = (initialState: any, handlers: any) => {
  return (state = initialState, action: any) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};

// no types avalable for fetch options
export const fetchAsync = (url: string, options?: any) => {
  if (options == null) {
    options = {};
  }
  return fetch(url, options).then((response: any) => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response.json());
    } else {
      const error = new Error(response.statusText || response.status);
      (error as any).response = response;
      return Promise.reject(error);
    }
  });
};
