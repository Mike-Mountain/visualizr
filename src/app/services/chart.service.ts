import {Injectable} from '@angular/core';
import {ChartUtils} from '../utils/chart.utils';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  utils = new ChartUtils();

  currentChat: string;

  constructor() {
  }

  getLabels(year: number) {
    const arrayOfMonths = [];
    this.utils.monthsLabels.forEach((month, idx) => {
      const singleMonth = this.getDaysInMonth(idx, year);
      arrayOfMonths.push(singleMonth);
    });
    return [].concat.apply([], arrayOfMonths);
  }

  getData(messages: string[], labels: string[], year: string) {
    const daysArray = [];
    messages.forEach(message => {
      if (message.charAt(1) === '0' || message.charAt(1) === '1') {
        let date = message.substring(1, 6);

        date = this.utils.formatDate(date, year);
        daysArray.push(date);
      }
    });

    // Reduce the array of dates and count the number of times each date is repeated. Output is an array of numbers.
    const map = daysArray.reduce((prev, cur) => {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});

    const dataByDay: { day: string, value: number }[] = [];

    labels = labels.filter(label => {
      let thisYear = label.substring(8, 13);
      if (thisYear.charAt(0) !== '2') {
        thisYear = label.substring(9, 13);
      }

      if (thisYear === year) {
        return label;
      }
    });

    labels.forEach(label => {
      const item = {
        day: label,
        value: 0
      };
      Object.keys(map).forEach(key => {
        if (key === label) {
          item.value = map[key];
        }
      });
      dataByDay.push(item);
    });

    const data = [];
    dataByDay.forEach(day => {
      data.push(day.value);
    });

    return Object.values(data);
  }

  getDaysInMonth(month, year) {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      const fullDate = new Date(date);
      const smallMonth = this.utils.getMonthInString(month);
      const day = this.utils.formatDayString(fullDate.getDate().toString(), smallMonth, year.toString());
      days.push(day);
      date.setDate(date.getDate() + 1);
    }
    return days;
  }
}
