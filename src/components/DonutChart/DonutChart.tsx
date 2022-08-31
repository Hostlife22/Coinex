import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';
import { Data } from '../../pages/Revenue/Revenue.interface';
import { IDataEvent, IDonutChartProps } from './DonutChart.interface';
import './DonutChart.scss';

export class Dimensions {
  public radius: number;

  constructor(public width: number, public height: number) {
    this.radius = Math.min(width, height) / 2;
  }
}

const dimensions = new Dimensions(360, 360);

const DonutChart = (props: IDonutChartProps) => {
  const svgRef = useRef<HTMLDivElement | null>(null);
  const [selection, setSelection] = useState<null | d3.Selection<
    HTMLDivElement | null,
    unknown,
    null,
    undefined
  >>(null);
  const dataP = props.data || [];

  console.log(dataP);

  const pie = d3
    .pie<Data>()
    .value((d) => d.value)
    .sort(null);

  const arc = d3
    .arc<d3.PieArcDatum<Data>>()
    .innerRadius(250 / 3)
    .outerRadius(dimensions.radius * 0.9);

  const color = d3.scaleOrdinal(d3.schemeSet3);

  const drawChart = () => {
    if (!selection) {
      setSelection(d3.select(svgRef.current));
    } else {
      const svg = selection
        .append('svg')
        .attr('id', 'DonutChart')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height)
        .attr('viewBox', `0 0 ${dimensions.height} ${dimensions.width}`)
        .append('g')
        .attr('transform', `translate(${dimensions.width / 2},${dimensions.height / 2})`);

      svg
        .selectAll('DonutLine')
        .data(pie(dataP))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', (_, i) => color(String(i)))
        .style('cursor', 'pointer')
        .on('mouseover', function (d, i) {
          const data = (d3.select(this).data() as [IDataEvent])[0].data;

          d3.select('#text1').text(data.item);
          d3.select('#text2').text('$' + data.value.toFixed(2));
          d3.select('#text3').text((data.value / (props.total / 100)).toFixed(2) + '%');
          d3.select(this).transition().duration(50).attr('opacity', 0.75);
        })
        .on('click', function (d) {
          const data = (d3.select(this).data() as [IDataEvent])[0].data;

          if (data.id && props.cb) {
            props.cb(data.id);
          }
        })
        .on('mouseout', function (d, i) {
          d3.select('#text1').text('Purchase');
          d3.select('#text2').text(`$${props.total.toFixed(2)}`);
          d3.select('#text3').text('100%');
          d3.select(this).transition().duration(50).attr('opacity', 1);
        });

      svg
        .selectAll('DonutLine')
        .data(pie(dataP))
        .enter()
        .append('text')
        .style('font-weight', 'bold')
        .attr('text-anchor', 'middle')
        .attr('font-size', '0.65rem')
        .attr('transform', function (d) {
          return 'translate(' + arc.centroid(d)[0] + ',' + arc.centroid(d)[1] + ')';
        })
        .text(function (d) {
          return d.data.item;
        });

      svg
        .append('text')
        .attr('id', 'text1')
        .text('Purchase')
        .attr('text-anchor', 'middle')
        .attr('font-size', 'calc(1rem + 0.1vw)')
        .attr('font-weight', 'bold')
        .attr('dy', '-1.5em');
      svg
        .append('text')
        .attr('id', 'text2')
        .text(`$${props.total.toFixed(2)}`)
        .attr('text-anchor', 'middle')
        .attr('font-size', 'calc(1rem + 0.1vw)');
      svg
        .append('text')
        .attr('id', 'text3')
        .text(`100%`)
        .attr('text-anchor', 'middle')
        .attr('font-size', 'calc(1rem + 0.1vw)')
        .attr('dy', '2em');
    }
  };

  const reDrawChart = () => {
    d3.select(svgRef.current).select('#DonutChart').remove();
    drawChart();
  };

  useEffect(() => {
    drawChart();
  }, []);

  useEffect(() => {
    reDrawChart();
  }, [dataP]);

  return <div id="DonutChart" ref={svgRef}></div>;
};

export default DonutChart;
