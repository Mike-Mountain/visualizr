export class ChartUtils {

  monthsLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  formatDayString(day: string, month: string, year: string) {
    switch (true) {
      case (day === '1' || day === '21' || day === '31'):
        return month + ' ' + day + 'st' + ' ' + year;
      case (day === '2' || day === '22'):
        return month + ' ' + day + 'nd' + ' ' + year;
      case (day === '3' || day === '23'):
        return month + ' ' + day + 'rd' + ' ' + year;
      default:
        return month + ' ' + day + 'th' + ' ' + year;
    }
  }

  formatDate(date: string, year: string): string {
    let month = date.substring(0, 2);
    const day = date.substring(3, 6);

    month = this.getMonthName(month);

    return this.formatDayString(day, month, year);
  }

  getMonthInString(month: number) {
    const fullString = this.monthsLabels[month];
    if (fullString) {
      return fullString.substring(0, 3);
    }
  }

  getMonthName(month: string): string {
    switch (month) {
      case '01':
        return 'Jan';
      case '02':
        return 'Feb';
      case '03':
        return 'Mar';
      case '04':
        return 'Apr';
      case '05':
        return 'May';
      case '06':
        return 'Jun';
      case '07':
        return 'Jul';
      case '08':
        return 'Aug';
      case '09':
        return 'Sep';
      case '10':
        return 'Oct';
      case '11':
        return 'Nov';
      case '12':
        return 'Dec';
    }
  }
}
