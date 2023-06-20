export class DateUtil {

  static getMonthYearFromDate(date = new Date) {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return { month, year };
  }

  static isDate(date) {
    return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date);
  }

}
