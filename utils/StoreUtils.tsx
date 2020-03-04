import {AsyncStorage} from 'react-native';

export function dispatchStore(
  dispatch: any,
  actionType: string,
  key: string,
  value: Object,
  funcName: string,
  actionBuilder: Object,
) {
  switch (actionType) {
    case 'setData':
      dispatch((actionBuilder[`${funcName}Loading`] as Function)());
      setData(key, value, actionBuilder, dispatch, funcName);
      break;
    case 'getData':
      getDate(key);
  }
}

async function setData(
  key: string,
  value: Object,
  actionBuilder: Object,
  dispatch: any,
  funcName: string,
) {
  try {
    checkKeyBeforeSave(key, dispatch, funcName);
    await AsyncStorage.setItem(key, JSON.stringify(value));
    dispatch((actionBuilder[`${funcName}Success`] as Function)());
    getAllKeys();
  } catch (error) {
    console.log(error);
    dispatch((actionBuilder[`${funcName}Error`] as Function)());
  }
}

async function checkKeyBeforeSave(key: string, dispatch: any, funcName: string) {
  try {
    let compareItem = await AsyncStorage.getItem(key);
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
