export const option = {
  backgroundColor: '#fff',

  title: null,

  tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },

  series : [
    {
      name:'用户性质',
      type:'pie',
      radius : '55%',
      center: ['50%', '50%'],
      data:[
        {value:335, name:'会员'},
        {value:310, name:'非会员'},
      ],
      roseType: 'radius',
      label: {
        normal: {
          textStyle: {
            color: '#2A2'
          }
        }
      },
      labelLine: {
        normal: {
          lineStyle: {
            color: '#FFF'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        }
      },
      itemStyle: {
        normal: {
          color: '#c23531',
          shadowBlur: 2,
          shadowColor: '#FFF'
        }
      },

      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200;
      }
    }
  ]
};
