<template>

			<highchart
			  :options="chartOptions"
			  :animation="{duration: animationDuration}"
			  :exporting="true"
			  :update="watchers"
			  @chartLoaded="chartLoaded"
			/>
	</template>
	
	<script>
	export default {
	  data() {
		return {
		  points: [10, 0, 8, 2, 6, 4, 5, 5],
		  seriesColor: '',
		  animationDuration: 1000,
		  chartType: '',
		  colorInputIsSupported: null,
		  chartTypes: [],
		  durations: [0, 500, 1000, 2000],
		  seriesName: 'My Data',
		  watchers: undefined,
		  colors: [
			'Red',
			'Green',
			'Blue',
			'Pink',
			'Orange',
			'Brown',
			'Black',
			'Purple'
		  ],
		  lastPointClicked: {
			timestamp: '',
			x: '',
			y: ''
		  }
		}
	  },
	  props: {
		bookings: {
			default: [],
			type: Array
		}  
	  },
	  computed: {
	  	plottedBookings(){
			 if(this.bookings.length == 0) return { data: []}
			 
			 const bookingsPerLocation = this.bookings.reduce((acc, val) => {
				 const dates = acc[val.location] || []
				 return {...acc, [val.location]: [...dates, val.date] }
				 
			 }, {})

			 // TODO: less verbose
			 let allSeries = []
			 for (const key in bookingsPerLocation) {
			  	const valPerMonth = bookingsPerLocation[key].reduce((acc, d) => {
						const date = new Date(d);
						const month = ("0" + date.getMonth()).slice(-2);
						const year = date.getFullYear();
						const key = year + '' + month
						const val = acc[key] || 0;
						return { ...acc, [key]: val+1 }
					},{})
			  	
				 const onlyValues = Object.values(valPerMonth);
				   const firstMonth = Object.keys(valPerMonth).sort()[0]
				   
				   const dateString = firstMonth.toString()
				   const startYear = firstMonth.substring(0, 4);
				   const startMonth = firstMonth.slice(-2)
				   
				 const res = {
					   name: key,
					   data: onlyValues,
					   pointStart: Date.UTC(startYear, startMonth, 1),
					   pointInterval: 2592000000
				   }
				   allSeries.push(res)
				   
				   
			 }

			  return allSeries
			
		  }
		  ,
		chartOptions() {
		  const ctx = this
		  return {
			chart: {
			  backgroundColor: '#ffffff',
			  className: 'my-chart',
			  type: this.chartType.toLowerCase()
			},
			plotOptions: {
			  series: {
				cursor: 'pointer',
				point: {
				  events: {
					click() {
					  ctx.$emit('pointClicked', this)
					}
				  }
				}
			  }
			},
			yAxis: [{
			  title: {
				text: this.yAxis,
				style: {
				  color: '#000000'
				}
			  }
			}],
			xAxis: {
				type: 'datetime',
				labels: {
					// format: '{value:%m-%Y}',
					rotation: 45,
					align: 'left'
				}
			},
			title: false,
			subtitle: false,
			legend: {
			  itemStyle: {
				color: '#black'
			  }
			},
			series: this.plottedBookings
				
				
		  }
		}
	  },
	  mounted() {
		  this.chartTypes = this.$highcharts.chartTypes
		  this.chartType = this.chartTypes[0]
		  this.$on('pointClicked', (evt) => {
			this.$nextTick(() => {
			  
			})
		  })
		},
	  methods: {
		chartLoaded(chart) {
		}
	  }
	}
	</script>
	
	<style scoped>
	
	</style>