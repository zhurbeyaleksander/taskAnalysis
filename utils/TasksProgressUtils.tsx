import {AsyncStorage} from 'react-native';
import {find} from 'lodash';
import moment from 'moment';

export function getTaskProgress(
  dispatch: any,
  typeOfPeriod: string,
  data: any,
  funcName: string,
  actionBuilder: Object,
) {
  switch (typeOfPeriod) {
    case 'year':
      dispatch((actionBuilder[`${funcName}Loading`] as Function)());
      getYearProgress(dispatch, data, funcName, actionBuilder);
      break;

    case 'month':
      dispatch((actionBuilder[`${funcName}Loading`] as Function)());
      getMonthProgress(dispatch, data, funcName, actionBuilder);
      break;

    case 'day':
      getDayProgress(dispatch, data, funcName, actionBuilder);
      break;
  }
}

async function getYearProgress(
  dispatch: any,
  year: number,
  funcName: string,
  actionBuilder: Object,
) {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const daysInYear = isLeapYear(year) ? 366 : 365;
    let progressResult = {
      totalTask: 0,
      totalRepeat: 0,
      totalToDo: 0,
    };
    allKeys.forEach((i, index) => {
      AsyncStorage.getItem(i).then(result => {
        const currentTask = JSON.parse(result);
        for (let j = 1; j <= daysInYear; j++) {
          let date = new Date(year, 0, j);
          const curDay = find(currentTask.daysToDo, {dayNumber: date.getDay()});
          if (curDay.toDo === 1) {
            progressResult.totalRepeat += 1;
          }
        }
        const allChecks = Object.keys(currentTask.checks);
        allChecks.forEach(i => {
          if (moment(year).format('YYYY-MM-DD') === moment(i).format('YYYY-MM-DD')) {
            progressResult.totalToDo += 1;
          }
        });
        progressResult.totalTask = allKeys.length;
        if (allKeys.length === index + 1) {
        dispatch((actionBuilder[`${funcName}Success`] as Function)(progressResult));
        }
      });
    });
  } catch (error) {
    const errorMsg = 'Ошибка получения данных';
    dispatch((actionBuilder[`${funcName}Error`] as Function)(errorMsg));
  }
}

async function getMonthProgress(
  dispatch: any,
  date: number,
  funcName: string,
  actionBuilder: Object,
) {
  try {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const monthDate = new Date(date);
    let days = daysInMonth[monthDate.getMonth()];
    if (isLeapYear(monthDate.getFullYear()) && monthDate.getMonth() === 1) days = 29;
    const allKeys = await AsyncStorage.getAllKeys();
    let progressResult = {
      totalTask: 0,
      totalRepeat: 0,
      totalToDo: 0,
      percent: 0,
    };
    if (allKeys.length === 0) {
      dispatch((actionBuilder[`${funcName}Success`] as Function)(progressResult));
    }
    allKeys.forEach((i, index) => {
      AsyncStorage.getItem(i).then(result => {
        const currentTask = JSON.parse(result);
        for (let j = 1; j <= days; j++) {
          let dateMonth = new Date(monthDate.getFullYear(), monthDate.getMonth(), j);
          const curDay = find(currentTask.daysToDo, {dayNumber: dateMonth.getDay()});
          if (curDay.toDo === 1) {
            progressResult.totalRepeat += 1;
          }
        }
        const allChecks = Object.keys(currentTask.checks);
        allChecks.forEach(i => {
          if (moment(monthDate).format('YYYY-MM') === moment(i).format('YYYY-MM')) {
            progressResult.totalToDo += 1;
          }
        });
        progressResult.totalTask = allKeys.length;
        progressResult.percent = Math.round((progressResult.totalToDo / progressResult.totalRepeat) * 100);
        if (allKeys.length === index + 1) {
          dispatch((actionBuilder[`${funcName}Success`] as Function)(progressResult));
        }
      });
    });
  } catch (error) {
    const errorMsg = 'Ошибка получения данных';
    dispatch((actionBuilder[`${funcName}Error`] as Function)(errorMsg));
  }
}

async function getDayProgress(
  dispatch: any,
  date: number,
  funcName: string,
  actionBuilder: Object,
) {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    let progressResult = {
      totalTask: 0,
      totalRepeat: 0,
      totalToDo: 0,
      percent: 0,
    };
    if (allKeys.length === 0) {
      dispatch((actionBuilder[`${funcName}Success`] as Function)(progressResult));
    }
    allKeys.forEach((i, index) => {
      AsyncStorage.getItem(i).then(result => {
        const currentTask = JSON.parse(result);
        let dateDay = new Date(date);
        const curDay = find(currentTask.daysToDo, {dayNumber: dateDay.getDay()});
        if (curDay.toDo === 1) {
          progressResult.totalRepeat += currentTask.repeat;
          progressResult.totalTask += 1;
        }
        const allChecks = Object.keys(currentTask.checks);
        allChecks.forEach(i => {
          if (moment(dateDay).format('YYYY-MM-DD') === moment(i).format('YYYY-MM-DD')) {
            progressResult.totalToDo += 1;
          }
        });
        progressResult.percent = Math.round((progressResult.totalToDo / progressResult.totalRepeat) * 100);
        if (allKeys.length === index + 1) {
          dispatch((actionBuilder[`${funcName}Success`] as Function)(progressResult));
        }
      });
    });
  } catch (error) {
    const errorMsg = 'Ошибка получения данных';
    dispatch((actionBuilder[`${funcName}Error`] as Function)(errorMsg));
  }
}

function isLeapYear(year: number) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? true : false;
}

export async function getTaskListInDate(
  dispatch: any,
  date: any,
  funcName: string,
  actionBuilder: Object,
) {
  try {
    dispatch((actionBuilder[`${funcName}Loading`] as Function)());
    const allKeys = await AsyncStorage.getAllKeys();
    let taskList: Array<Object> = [];
    if (allKeys.length === 0) {
      dispatch((actionBuilder[`${funcName}Success`] as Function)(taskList));
    }
    allKeys.forEach((i, index) => {
      AsyncStorage.getItem(i).then(result => {
        const currentTask = JSON.parse(result);
        let dateDay = new Date(date);
        const curDay = find(currentTask.daysToDo, {dayNumber: dateDay.getDay()});
        if (curDay.toDo === 1) {
          taskList.push(currentTask);
        }
        if (allKeys.length === index + 1) {
          dispatch((actionBuilder[`${funcName}Success`] as Function)(taskList));
        }
      });
    });
  } catch (error) {
    const errorMsg = 'Ошибка получения данных';
    dispatch((actionBuilder[`${funcName}Error`] as Function)(errorMsg));
  }
}

export async function addCheckToStorage(
  dispatch: any,
  key: string,
  date: any,
  funcName: string,
  actionBuilder: Object,
) {
  try {
    dispatch((actionBuilder[`${funcName}Loading`] as Function)());
    const newCheck = {checks: {[`${date}`]: 1}};

    await AsyncStorage.mergeItem(key, JSON.stringify(newCheck));
    dispatch((actionBuilder[`${funcName}Success`] as Function)());
  } catch (error) {
    const errorMsg = 'Ошибка получения данных';
    dispatch((actionBuilder[`${funcName}Error`] as Function)(errorMsg));
  }
}
