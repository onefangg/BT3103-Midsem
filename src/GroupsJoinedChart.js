import {Line} from 'vue-chartjs'
export default{
    extends:Line,
    data: () => ({
        chartdata: {
          labels: ['January', 'February','March','April'],
          datasets: [
            {
              label: 'Your Groups',
              data: [0,1,2,2],
              backgroundColor: 'orange',
              fill:false
            },
            {
                label: 'Other Users',
                data: [2,3,5,6],
                backgroundColor:'blue',
                fill: false
                
                
              }
          ]
          
        },
        options: {
            title:{
                display:true,
                text:'Number of Groups Joined over Time',
                fontColor:'Black',
                fontSize:15

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