import {AsyncStorage} from 'react-native';
import {find} from 'lodash';

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

function isLeapYear(year: number) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? true : false;
}
