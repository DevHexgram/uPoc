// import echarts from 'echarts'
// const echarts = require('echarts/lib/echarts');
// require('echarts/lib/chart/bar');
// 引入提示框和标题组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');
// import store from '../store/index'
const echarts = require('echarts');

const install = function (Vue) {
    Object.defineProperties(Vue.prototype, {
        $chart: {
            get() {
                return {
                    init: function (id) {
                        // console.log(1)
                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();
                            // $.get()
                        let option = {
                            title: {
                                text: '异步数据加载示例'
                            },
                            tooltip: {},
                            legend: {
                                data:['支出']
                            },
                            xAxis: {
                                data: []
                            },
                            yAxis: {},
                            series: [{
                                name: '支出',
                                type: 'bar',
                                data: []
                            }]
                        };
// console.log(2)
                        // this.chart.showLoading();
                        // setTimeout("console.log(1)",5000);
                        // console.log(store.getters.AffairSorted);


                        // 使用刚指定的配置项和数据显示图表。
                        this.chart.setOption(option);
                    },
                    update:function (id,Monthaffairs) {
                        // console.log(1)
                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.setOption({
                            xAxis:{
                              data:Monthaffairs.Date
                              //   data:['1','2','3']
                            },
                            series:[{
                               name:'支出',
                               data:Monthaffairs.spends
                            }],
                        })
                    }
                }
            }
        }
    })
}

export default {
    install
}
