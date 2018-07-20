'use strict'

const x = []
const y = []
const z = []

const raw_datasets = []
const xAxisLength = 20

let datasets = []

const update_datasets = () => {

  raw_datasets.forEach(d => {
    const val = d.split(',')

    if (x.length >= xAxisLength) {
      x.shift()
    }
    if (y.length >= xAxisLength) {
      y.shift()
    }
    if (z.length >= xAxisLength) {
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

const labels = [0.0]
const startTime = new Date().getTime()

const update_labels = () => {
  if (labels.length >= xAxisLength) {
    labels.shift()
  }

  labels.push(((new Date().getTime() - startTime) / 1000).toFixed(1))
}

const listen_socket_io = () => {
  const socket = window.io('ws://localhost:30000')

  socket.on('sensor_update', function (data) {
    document.getElementById('val').innerHTML = data


    if (raw_datasets.length >= xAxisLength) {
      raw_datasets.shift()
    }

    raw_datasets.push(data)

    update_datasets()
    update_labels()

    window.monitor.update()
  })
}


window.onload = () => {
  const monitor = document.getElementById('monitor').getContext('2d')

  update_datasets()
  listen_socket_io()


  const data = {
    labels: labels,
    datasets,
  }

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      mode: 'index',
    },
    // scales: {
    //   yAxes: [{
    //     id: 'y',
    //     stacked: true,
    //     gridLines: {
    //       display: true,
    //       color: 'rgba(255,99,132,0.2)',
    //     },
    //     display: true,
    //     labelString: 'Value',
    //   }],

    //   xAxes: [{
    //     id: 'x',
    //     display: true,
    //     gridLines: {
    //       display: true
    //     },
    //     labelString: 'Time',
    //   }],
    // },
    animation: {
      duration: 100,
    }
  }

  window.monitor = new window.Chart(monitor, {
    type: 'line',
    options: options,
    data: data
  })
}