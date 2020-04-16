import {Bar} from 'vue-chartjs'
export default{
    extends:Bar,
    data: () => ({
        chartdata: {
          labels: ['January', 'February','March','April'],
          datasets: [
            {
              label: 'Your logins',
              data: [36, 20,11,7],
              backgroundColor:'orange',
              borderWidth:1.0,
              borderColor:"#000"
            }
            ,
            {
                label: 'Other users',
                data: [40, 30,15,11],
                backgroundColor: 'blue',
                borderWidth:1.0,
                borderColor:"#000"
              }
          ]
          
        },
        
        options: {
            title:{
                display:true,
                text:'Logins Count over Months',
                fontColor:'Black',
                fontSize:15

            },
            legend:{
                position:'top'
            },
            layout:{
                padding:{
                    left: 5,
                    right: 0,
                    top: 0,
                    bottom: 5
                }
            },
            scales:{
                yAxes:[{
                    ticks:{
                        min:0
                    }

                }]
            }
          
        }
      }),
    mounted(){
        this.renderChart(this.chartdata,this.options)
    }
}