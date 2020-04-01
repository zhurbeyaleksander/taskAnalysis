import {AsyncStorage} from 'react-native';
import {isNil} from 'lodash';

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
      break;
    case 'getAllKeys':
      getAllKeys(actionBuilder, dispatch, funcName);
      break;
    case 'removeData':
      removeData(actionBuilder, dispatch, funcName, key);
      break;
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
    const objectFromStorageByKey = await AsyncStorage.getItem(key);
    if (isNil(objectFromStorageByKey)) {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      dispatch((actionBuilder[`${funcName}Success`] as Function)());
    } else {
      const error = 'Задача с таким названием уже существует';
      dispatch((actionBuilder[`${funcName}Error`] as Function)(error));
    }
  } catch (error) {
    console.log(error);
    dispatch((actionBuilder[`${funcName}Error`] as Function)());
  }
}

async function checkKeyBeforeSave(key: string, dispatch: any, funcName: string) {
  try {
    let compareItem = await AsyncStorage.getItem(key);
    let newValue = JSON.parse(compareItem);
    if (newValue.taskTitle === key) {
      return Promise.resolve(true);
    }
    return Promise.resolve(true);
  } catch (error) {
    console.log(error);
  }
  return Promise.resolve(true);
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

async function getAllKeys(
  actionBuilder: Object,
  dispatch: any,
  funcName: string,
) {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    dispatch((actionBuilder[`${funcName}Success`] as Function)(allKeys));
  } catch (error) {
    const errorMsg = 'Ошибка получения данных';
    dispatch((actionBuilder[`${funcName}Error`] as Function)(errorMsg));
  }
}

async function removeData(
  actionBuilder: Object,
  dispatch: any,
  funcName: string,
  key: string,
) {
  try {
    await AsyncStorage.removeItem(key);
    dispatch((actionBuilder[`${funcName}Success`] as Function)());
  } catch (error) {
    const errorMsg = error;
    dispatch((actionBuilder[`${funcName}Error`] as Function)(errorMsg));
  }
}
