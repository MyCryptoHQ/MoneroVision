export const calculateAge = (start: string) => {
  const timestampUTC = +new Date(start);
  const nowUTC = new Date().toUTCString();
  const diffMs = +new Date(nowUTC) - timestampUTC;
  const diffDays = Math.floor(diffMs / 86400000); // days
  const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  const diffSecs = Math.round(diffMs / 1000); // seconds
  return !!diffDays
    ? diffDays + 'd'
    : !!diffHrs ? diffHrs + 'h' : !!diffMins ? diffMins + 'm' : diffSecs + 's';
};

export const toKB = (bytes: number | string) => {
  let bytesInt: number;
  typeof bytes === 'string' ? (bytesInt = parseInt(bytes, 10)) : (bytesInt = bytes);
  return bytesInt / 1000 + ' kB';
};

export const formatApiDateStrings = (str: string) => {
  const s = str.split(' ');
  return s[0].replace(/-/g, ' / ') + ' – ' + s[1] + ' UTC';
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

export const fetchAsync = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
