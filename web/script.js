'use strict'

const x = []
const y = []
const z = []

const raw_datasets = [
  // '12,32,11',
  // '23,44,12',
  // '33,22,33',
]

let datasets = []

const update_datasets = () => {
  raw_datasets.forEach(d => {
    const val = d.split(',')

    if (x.length > 10) {
      x.shift()
    }
    if (y.length > 10) {
      y.shift()
    }
    if (z.length > 10) {
      z.shift()
    }

    x.push(parseFloat(val[0]))
    y.push(parseFloat(val[1]))
    z.push(parseFloat(val[2]))
  })


  datasets = [
    {
      label: 'X',
      backgroundColor: 'rgba(255,255,255,0.0)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 2,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: x,
      fill: false,
    },
    {
      label: 'Y',
      backgroundColor: 'rgba(255,255,255,0.0)',
      borderColor: '#44A19A',
      borderWidth: 2,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: y,
      fill: false,
    },
    {
      label: 'Z',
      backgroundColor: 'rgba(255,255,255,0.0)',
      borderColor: '#000000',
      borderWidth: 2,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: z,
      fill: false,
    },
  ]

}


const listen_socket_io = () => {
  const socket = window.io('ws://localhost:30000')

  socket.on('sensor_update', function (data) {
    document.getElementById('val').innerHTML = data

    if (raw_datasets.length > 10) {
      raw_datasets.shift()
    }

    raw_datasets.push(data)

    update_datasets()
    window.monitor.update()
  })
}


window.onload = () => {
  const monitor = document.getElementById('monitor').getContext('2d')

  update_datasets()
  listen_socket_io()


  const data = {
    labels: new Array(11).fill(0),
    datasets,
  }

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      mode: 'index',
    },
    scales: {
      yAxes: [{
        id: 'y',
        stacked: true,
        gridLines: {
          display: true,
          color: 'rgba(255,99,132,0.2)',
        },
        display: true,
        labelString: 'Value',
      }],

      xAxes: [{
        id: 'x',
        display: true,
        gridLines: {
          display: true
        },
        labelString: 'Time',
      }],
    },
    animation: {
      duration: 0,
    }
  }

  window.monitor = new window.Chart(monitor, {
    type: 'line',
    options: options,
    data: data
  })
}