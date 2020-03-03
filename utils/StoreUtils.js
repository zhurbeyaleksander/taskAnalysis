import {AsyncStorage} from 'react-native';

export function dispatchStore(actionType, key, value) {
  switch (actionType) {
    case 'setData':
      setData(key, value);
      getAllKeys();
      break;
    case 'getData':
      getDate(key);
  }
}

async function setData(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}

async function getDate(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    console.log(value);
    if (value !== null) {
      console.log(value);
    }
  } catch (error) {
    console.log(`Ошибка ${error}`);
  }
}

async function getAllKeys() {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    if (allKeys !== null) {
      console.log(allKeys);
    }
  } catch (error) {
    console.log(`Ошибка ${error}`);
  }
}
