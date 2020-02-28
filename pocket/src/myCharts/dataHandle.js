// import {months} from "moment";

export function dealMonthData(MonthData) {
    // console.log(MonthData);
    let DaysOfMonth = getDaysArray(MonthData[0].data.Date.getFullYear(), MonthData[0].data.Date.getMonth()+1);
    let MonthLength = DaysOfMonth.length-1;
    // console.log(MonthLength);
    let MonthSpend = Array(MonthLength+1).fill(0);
    let MonthIncome =Array(MonthLength+1).fill(0);
    MonthSpend[0]="MonthSpend";
    MonthIncome[0]="MonthIncome";
    let index;
    for (index in MonthData) {
        if (MonthData[index].type==="+"){
            MonthIncome[MonthData[index].data.Date.getDate()]+=MonthData[index].data.Number
            // console.log(1)
        } else if (MonthData[index].type==="-") {
            // console.log(MonthData[index].data.Date.getDate())
            MonthSpend[MonthData[index].data.Date.getDate()]+=MonthData[index].data.Number
        }
    }
    // console.log(MonthIncome);
    // console.log(MonthSpend);
    let result = [];
    result[0]=DaysOfMonth;
    result[1]=MonthSpend;
    result[2]=MonthIncome;
    // console.log(result)
    return result;
}

const getDaysArray = (year, month) => {
    // const names = Object.freeze(
    //     ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']);
    const date = new Date(year, month - 1, 1);
    const result = [];
    result[0]="days";
    while (date.getMonth() === month - 1) {
        // result.push(`${date.getDate()}-${names[date.getDay()]}`);
        result.push(`${date.getDate()}`);
        date.setDate(date.getDate() + 1);
    }
    return result;
}
