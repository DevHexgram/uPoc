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
                    line1: function (PieID, BarId, MonthData) {
                        let dataForShow = [];
                        dataForShow = dealMonthData(MonthData);
                        console.log(dataForShow);

                        this.chart = echarts.init(document.getElementById(PieID));
                        this.chart.clear();

                        const optionOfPie = {
                            // title: {
                            // text: 'ECharts 入门示例'
                            // },
                            tooltip: {
                                // trigger: 'axis',
                                trigger: 'item',
                                formatter: '{a} <br/>{b}: {c} ({d}%)'
                            },
                            visualMap: {
                                // 不显示 visualMap 组件，只用于明暗度的映射
                                show: false,
                                // 映射的最小值为 80
                                min: 10,
                                // 映射的最大值为 600
                                max: 500,
                                inRange: {
                                    // 明暗度的范围是 0 到 1
                                    colorLightness: [0.9,0.1]
                                }
                            },
                            series: [
                                {
                                    name: '收入',
                                    type: 'pie',
                                    radius: '60%',
                                    center: ['25%', '50%'],
                                    roseType: 'angle',
                                    itemStyle: {
                                        // 阴影的大小
                                        shadowBlur: 200,
                                        // 阴影水平方向上的偏移
                                        shadowOffsetX: 0,
                                        // 阴影垂直方向上的偏移
                                        shadowOffsetY: 0,
                                        // 阴影颜色
                                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                                        color: "#70F3FF"
                                    },
                                    label: {
                                        normal: {
                                            show: false,
                                            position: 'center',
                                            // position: 'outer',
                                            // alignTo: 'labelLine',
                                            // bleedMargin: 10,
                                            color: "#ffffff"
                                        },
                                        emphasis: {
                                            show: true,
                                            // position:'top',
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
                                    radius: '60%',
                                    center: ['75%', '50%'],
                                    roseType: 'angle',
                                    itemStyle: {
                                        // 阴影的大小
                                        shadowBlur: 200,
                                        // 阴影水平方向上的偏移
                                        shadowOffsetX: 0,
                                        // 阴影垂直方向上的偏移
                                        shadowOffsetY: 0,
                                        // 阴影颜色
                                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                                        color: '#FF7500',
                                    },
                                    label: {
                                        normal: {
                                            show: false,
                                            position: 'center',
                                            color:'#ffffff'
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

                        this.chart.setOption(optionOfPie);

                        this.chart = echarts.init(document.getElementById(BarId));
                        const optionOfBar = {
                            legend: {
                                data: ['销量']
                            },
                            tooltip: {
                                trigger: 'axis',
                            },
                            xAxis: {
                                data: dataForShow[0],
                                name:"日期",
                                axisLine:{
                                    symbol:['none','arrow'],
                                    symbolOffset:10,
                                },
                                axisPointer:{
                                    handle: {
                                        size:"20",
                                        margin:"30",
                                        show: true,
                                        color: '#004E52'
                                    }
                                },
                            },
                            yAxis: {},
                            // grid: {top: '60%', bottom: '10%'},
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
                            },]
                        }
                        this.chart.setOption(optionOfBar)
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
