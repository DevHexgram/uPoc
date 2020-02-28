// import echarts from 'echarts'
// const echarts = require('echarts/lib/echarts');
// require('echarts/lib/chart/bar');
// 引入提示框和标题组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');
// import store from '../store/index'
import {dealMonthData} from "./dataHandle";

const echarts = require('echarts');

const install = function (Vue) {
    Object.defineProperties(Vue.prototype, {
        $chart: {
            get() {
                return {
                    //画一条简单的线
                    line1: function (id, MonthData) {
                        let dataForShow = [];
                        dataForShow = dealMonthData(MonthData)
                        console.log(dataForShow)

                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();

                        const option = {
                            title: {
                                text: 'ECharts 入门示例'
                            },
                            tooltip: {},
                            legend: {
                                data:['销量']
                            },
                            xAxis: {
                                data: dataForShow[0]
                            },
                            yAxis: {},
                            series: [{
                                name: '支出',
                                type: 'bar',
                                data: dataForShow[1]
                            },{
                                name:'收入',
                                type:'bar',
                                data:dataForShow[2]
                            }]
                        };

                        this.chart.setOption(option);
                        // this.chart.on('click', function (params) {
                            // window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
                            // console.log(params.value)
                        // });
                    },
                }
            }
        }
    })
}

export default {
    install
}
