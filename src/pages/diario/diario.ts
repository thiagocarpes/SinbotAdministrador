import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'Firebase';

@IonicPage()
@Component({
    selector: 'page-diario',
    templateUrl: 'diario.html',
})
export class DiarioPage {

    showChart = false;

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };

    ref = firebase.database().ref('chamadosSolucao/');

    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;
    
    public barChartLabels: string[] = [];
    public barChartData: any[] = [];

    public lineChartColors:Array<any> = [
        { // primeira coluna
          backgroundColor: '#0bb502',
          borderColor: '#0bb502',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // segunda coluna
          backgroundColor: 'rgba(77,83,96,0.2)',
          borderColor: 'rgba(77,83,96,1)',
          pointBackgroundColor: 'rgba(77,83,96,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(77,83,96,1)'
        }
    ];

    constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
        var results = this.getAll();
        console.log(results);
        //this.barChartLabels = results['barChartLabels'];
        //this.barChartData = results['barChartData'];
    }

    getAll() {
        var titulosDias = [];
        var valorDoDia = [];
        var colunas = [{data:[]}];
        this.ref.on('value', resp => {

            //essa variavel 'data' retorna tudo o que está no 'chamadosSolucao' no fireBase
            var data = resp.val();

            var i = 1;
            var id = 0;
            var numberAt = "";

            //aqui faz o loop de cada registro do 'chamadosSolucao' no fireBase
            Object.keys(data).forEach(function(key,index){ 
                var dataReg = new Date(data[key].data);
                var number = (dataReg.getMonth() + 1)+''+(dataReg.getDate() + 1);
                
                if(i==1){
                    titulosDias[id] = (dataReg.getDate() + 1)+'/'+(dataReg.getMonth() + 1);
                    valorDoDia[(dataReg.getDate() + 1)+'/'+(dataReg.getMonth() + 1)] = 1;
                }else if(number == numberAt){
                    titulosDias[id] = (dataReg.getDate() + 1)+'/'+(dataReg.getMonth() + 1);
                    valorDoDia[(dataReg.getDate() + 1)+'/'+(dataReg.getMonth() + 1)]++;
                }else{
                    id++;
                    titulosDias[id] = (dataReg.getDate() + 1)+'/'+(dataReg.getMonth() + 1);
                    valorDoDia[(dataReg.getDate() + 1)+'/'+(dataReg.getMonth() + 1)] = 1;
                }

                numberAt = number;
                i++;
            });

            Object.keys(valorDoDia).forEach(function(key,index) {
                colunas[0]['data'][index] = valorDoDia[key];
            });
            colunas[0]['label'] = "Sucesso";

            this.barChartLabels = titulosDias;
            this.barChartData = colunas;
        });
    }

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    public showData() {
        this.showChart = true;
    }



}
