// import {months} from "moment";

export function dealMonthData(MonthData) {
    let result = [];
    result = getTotalData(MonthData);
    result.push(getTypeData(MonthData));
    return result
}


function getTypeData(MonthData) {
    let spendList = [
        {value: 0, name: '日常费用'},
        {value: 0, name: "固定支出"},
        {value: 0, name: "大项消费"},
        {value: 0, name: "往来开销"},
        {value: 0, name: "娱乐开支"},
        {value: 0, name: "其它消费"}];
    let incomeList = [
        {value: 0, name: '工作收入'},
        {value: 0, name: "固定收入"},
        {value: 0, name: "理财收入"},
        {value: 0, name: "外快收入"},
        {value: 0, name: "其它收入"},];
    let index;
    for (index in MonthData) {
        switch (MonthData[index].data.Type) {
            case "日常费用":
                spendList[0].value += -MonthData[index].data.Number;
                break;
            case "固定支出":
                spendList[1].value += -MonthData[index].data.Number;
                break;
            case "大项消费":
                spendList[2].value += -MonthData[index].data.Number;
                break;
            case "往来开销":
                spendList[3].value += -MonthData[index].data.Number;
                break;
            case "娱乐开支":
                spendList[4].value += -MonthData[index].data.Number;
                break;
            case "其它消费":
                spendList[5].value += -MonthData[index].data.Number;
                break;
            case "工作收入":
                incomeList[0].value += MonthData[index].data.Number;
                break;
            case "固定收入":
                incomeList[1].value += MonthData[index].data.Number;
                break;
            case "理财收入":
                incomeList[2].value += MonthData[index].data.Number;
                break;
            case "外快收入":
                incomeList[3].value += MonthData[index].data.Number;
                break;

            case "其它收入":
                incomeList[4].value += MonthData[index].data.Number;
                break;
        }
    }
    // for (index in incomeList) {
    //     if (incomeList[index].value===0){
    //         incomeList.splice(index,1)
    //     }
    // }
    // for (index in spendList) {
    //     if (spendList[index].value===0){
    //         spendList.splice(index,1)
    //     }
    // }
    // console.log(incomeList);
    // console.log(spendList);
    let result=[];
    result[0]=incomeList;
    result[1]=spendList;
    return result
}

function getTotalData(MonthData) {
    // console.log(MonthData);
    let DaysOfMonth = getDaysArray(MonthData[0].data.Date.getFullYear(), MonthData[0].data.Date.getMonth() + 1);
    let MonthLength = DaysOfMonth.length ;
    // console.log(MonthLength);
    let MonthSpend = Array(MonthLength + 1).fill(0);
    let MonthIncome = Array(MonthLength + 1).fill(0);
    MonthSpend[0] = "MonthSpend";
    MonthIncome[0] = "MonthIncome";
    let index;
    for (index in MonthData) {
        if (MonthData[index].type === "+") {
            MonthIncome[MonthData[index].data.Date.getDate()] += MonthData[index].data.Number
            // console.log(1)
        } else if (MonthData[index].type === "-") {
            // console.log(MonthData[index].data.Date.getDate())
            MonthSpend[MonthData[index].data.Date.getDate()] += -MonthData[index].data.Number
        }
    }
    // console.log(MonthIncome);
    // console.log(MonthSpend);
    let result = [];
    result.push(DaysOfMonth);
    result.push(MonthSpend);
    result.push(MonthIncome);
    // console.log(result)
    return result;
}

const getDaysArray = (year, month) => {
    // const names = Object.freeze(
    //     ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']);
    const date = new Date(year, month - 1, 1);
    const result = [];
    while (date.getMonth() === month - 1) {
        // result.push(`${date.getDate()}-${names[date.getDay()]}`);
        result.push(`${date.getDate()}`);
        date.setDate(date.getDate() + 1);
    }
    return result;
}
