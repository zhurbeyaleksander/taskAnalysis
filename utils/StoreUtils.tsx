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
      getData(actionBuilder, dispatch, funcName, key);
      break;
    case 'getAllKeys':
      getAllKeys(actionBuilder, dispatch, funcName);
      break;
    case 'removeData':
      removeData(actionBuilder, dispatch, funcName, key);
      break;
    case 'mergeData':
      mergeData(actionBuilder, dispatch, funcName, key, value);
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

async function getData(
  actionBuilder: Object,
  dispatch: any,
  funcName: string,
  key: string,
) {
  try {
    const task = await AsyncStorage.getItem(key);
    const parseTask = JSON.parse(task);
    dispatch((actionBuilder[`${funcName}Success`] as Function)(parseTask));
  } catch (error) {
    const errorMsg = error;
    dispatch((actionBuilder[`${funcName}Error`] as Function)(errorMsg));
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
    const errorMsg = error;
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

async function mergeData(
  actionBuilder: Object,
  dispatch: any,
  funcName: string,
  key: string,
  data: Object,
) {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(data));
    dispatch((actionBuilder[`${funcName}Success`] as Function)());
  } catch (error) {
    const errorMsg = error;
    dispatch((actionBuilder[`${funcName}Error`] as Function)(errorMsg));
  }
}
