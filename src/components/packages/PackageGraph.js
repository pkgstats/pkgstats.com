import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Chart from 'chart.js';

const Container = styled.div`

`;

class PackageGraph extends Component {
  constructor(props) {
    super(props);

    this.chartRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.data) {
      this.setupGraph();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      data,
      label,
      labels,
    } = this.props;

    if (!prevProps.data.length && data.length) {
      this.setupGraph();
      return;
    }

    const ctx = this.chartRef.current.getContext('2d');
    // this.chart.data.datasets[0].backgroundColor = gradientColor(this.chartRef, ctx, data);
    // this.chart.data.datasets[0].color = tickColor;
    this.chart.data.datasets[0].data = data;
    this.chart.data.datasets[0].label = label;
    this.chart.data.labels = labels;
    this.chart.update();
  }

  setupGraph() {
    const {
      data,
      label,
      labels,
      options,
    } = this.props;

    const ctx = this.chartRef.current.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            // backgroundColor: gradientColor(this.chartRef, ctx, data),
            // color: tickColor,
            data,
            label,
          },
        ],
      },
      options,
    });
  }

  render() {
    return (
      <Container>
        <canvas
          ref={this.chartRef}
          width="100%"
          height="200px"
        />
      </Container>
    );
  }
}

PackageGraph.propTypes = {
  data: PropTypes.array,
  label: PropTypes.string,
  labels: PropTypes.array,
  options: PropTypes.object,
};

PackageGraph.defaultProps = {
  data: [],
  label: '',
  labels: [],
  options: {
    backgroundColor: '#000',
    layout: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    elements: {
      rectangle: {
        backgroundColor: '#333',
      },
    },
    legend: false,
    maintainAspectRatio: false,
    showLine: true,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
        ticks: {
          beginAtZero: true,
          min: 0,
        },
      }],
    },
  },
};

export default PackageGraph;
