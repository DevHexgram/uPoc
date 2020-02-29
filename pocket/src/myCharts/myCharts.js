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
                            tooltip: {
                                // trigger: 'axis',
                                trigger: 'item',
                                formatter: '{a} <br/>{b}: {c} ({d}%)'
                            },
                            legend: {
                                data: ['销量']
                            },
                            xAxis: {
                                data: dataForShow[0]
                            },
                            yAxis: {},
                            grid: {top: '60%',bottom:'10%'},
                            series: [{
                                name: '支出',
                                type: 'bar',
                                data: dataForShow[1],
                                animationDelay: function (idx) {
                                    return idx * 50;
                                }
                            }, {
                                name: '收入',
                                type: 'bar',
                                data: dataForShow[2],
                                animationDelay: function (idx) {
                                    return idx * 50 + 300;
                                }
                            },
                                {
                                    name: '收入',
                                    type: 'pie',
                                    radius: ['20%','30%'],
                                    center: ['25%', '20%'],
                                    label: {
                                        normal: {
                                            show: false,
                                            position: 'center'
                                        },
                                        emphasis: {
                                            show: true,
                                            textStyle: {
                                                fontSize: '10',
                                                fontWeight: 'bold'
                                            }
                                        }
                                    },
                                    // roseType: 'angle',
                                    data:
                                        dataForShow[3][0]

                                },
                                {
                                    name: '支出',
                                    type: 'pie',
                                    radius: ['20%','30%'],
                                    center: ['75%', '20%'],
                                    label: {
                                        normal: {
                                            show: false,
                                            position: 'center'
                                        },
                                        emphasis: {
                                            show: true,
                                            textStyle: {
                                                fontSize: '10',
                                                fontWeight: 'bold'
                                            }
                                        }
                                    },
                                    // roseType: 'angle',
                                    data:
                                        dataForShow[3][1]

                                }],
                            animationEasing: 'elasticOut',
                            // animationDelayUpdate: function (idx) {
                            //     return idx * 5;
                            // }
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
