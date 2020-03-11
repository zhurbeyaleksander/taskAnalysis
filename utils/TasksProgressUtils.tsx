import {AsyncStorage} from 'react-native';

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
      getYearProgress(data, funcName, actionBuilder);
  }
}

async function getYearProgress(
  year: number,
  funcName: string,
  actionBuilder: Object,
) {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    let date = new Date(year, 0, 1);
    const daysInYear = isLeapYear(year) ? 366 : 365;
    let progressResult = {
      totalTask: 0,
      totalRepeat: 0,
      totalToDo: 0,
    };
    allKeys.forEach(i => {
      AsyncStorage.getItem(i).then(result => {
        console.log(result);
      });
      //for (let j = 1; j < daysInYear; j++) {}
    });

    progressResult.totalTask = allKeys.length;
  } catch (error) {
    const errorMsg = 'Ошибка получения данных';
    dispatch((actionBuilder[`${funcName}Error`] as Function)(errorMsg));
  }
}

function isLeapYear(year: number) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? true : false;
}
