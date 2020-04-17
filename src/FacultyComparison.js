import {Doughnut} from 'vue-chartjs'
export default{
    extends:Doughnut,
    data: () => ({
        chartdata: {
          labels: ['FASS', 'Computing','Science','Business'],
          datasets: [
            {
              label: 'Faculties Joined',
              data: [10, 70,10,10],
              backgroundColor:['aqua','lightgreen','red','orange'],
              borderWidth:0.5,
              borderColor:"#000"
            },
           /* {
                label: 'Sales2',
                data: [40, 30,10,15],
                backgroundColor:['blue','lightgreen','red','orange']
              }*/
          ]
          
        },
        options: {
            title:{
                display:true,
                text:'Breakdown of Groups joined by Faculty (%)',
                fontColor:'Black',
                fontSize:15

            },
            scales:{
                yAxes:[{
                    ticks:{
                        min:0
                    }

                }]
            },
            layout:{
              padding:{
                  left: 5,
                  right: 0,
                  top: 0,
                  bottom: 10
              }
          }
          
        }
      }),
    mounted(){
        this.renderChart(this.chartdata,this.options)
    }
}