import React from 'react'
import ReactEcharts from 'echarts-for-react'

const CircleChar = (props) => {
  const onChartReady = (echart) => {
      echart.hideLoading();
  };
  const onChartLegendSelectChanged = (param, echart) => {
    console.log(param, echart)
  };
  const onChartClick = (param, echart) => {
    console.log(param, echart)
  };

  let onEvents = {
    click: onChartClick,
    legendselectchanged: onChartLegendSelectChanged,
  };

  return (
    <div className="examples">
      <ReactEcharts
        option={props.option}
        onChartReady={onChartReady}
        showLoading={true}
        onEvents={onEvents}
      />
    </div>
  )
};

export default CircleChar
