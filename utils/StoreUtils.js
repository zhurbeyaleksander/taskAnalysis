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

async function setData(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
}

async function getDate(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(value);
    }
  } catch (error) {
    console.log(`Ошибка ${error}`);
  }
}
