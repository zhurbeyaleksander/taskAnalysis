import {AsyncStorage} from 'react-native';

export function dispatchStore(actionType, key, value) {
  switch (actionType) {
    case 'setData':
      setData(key, value);
      break;
    case 'getData':
      getDate(key);
  }
}

function setData(key, value) {
  AsyncStorage.setItem(key, value);
}

function getDate(key) {
  const value = AsyncStorage.getItem(key);
  alert(value);
}
