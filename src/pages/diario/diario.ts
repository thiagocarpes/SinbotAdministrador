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
    
    public barChartLabels: string[];
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
        },
        { // segunda coluna
          backgroundColor: 'rgba(77,83,96,0.2)',
          borderColor: 'rgba(77,83,96,1)',
          pointBackgroundColor: 'rgba(77,83,96,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // segunda coluna
          backgroundColor: 'rgba(77,83,96,0.2)',
          borderColor: 'rgba(77,83,96,1)',
          pointBackgroundColor: 'rgba(77,83,96,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(77,83,96,1)'
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
        this.getAll();
    }

    getAll() {
        var titulosDias = [];
        var valorDoDia = [];
        var primeira = [];
        var segunda = [];
        var terceira = [];
        var chamado = [];
        var colunas: any[];

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
                var chaveMes = (dataReg.getDate() + 1)+'/'+(dataReg.getMonth() + 1);
                
                if(i==1){
                    titulosDias[id] = chaveMes;
                    valorDoDia[chaveMes] = 1;
                    primeira[chaveMes] = 0;
                    segunda[chaveMes] = 0;
                    terceira[chaveMes] = 0;
                    chamado[chaveMes] = 0;
                    if(data[key].contador==0){ primeira[chaveMes] = 1; }
                    if(data[key].contador==1){ segunda[chaveMes] = 1; }
                    if(data[key].contador==2){ terceira[chaveMes] = 1; }
                    if(data[key].contador>=3){ chamado[chaveMes] = 1; }
                }else if(number == numberAt){
                    titulosDias[id] = chaveMes;
                    valorDoDia[chaveMes]++;
                    if(data[key].contador==0){ primeira[chaveMes]++; }
                    if(data[key].contador==1){ segunda[chaveMes]++; }
                    if(data[key].contador==2){ terceira[chaveMes]++; }
                    if(data[key].contador>=3){ chamado[chaveMes]++; }
                }else{
                    id++;
                    titulosDias[id] = chaveMes;
                    valorDoDia[chaveMes] = 1;
                    primeira[chaveMes] = 0;
                    segunda[chaveMes] = 0;
                    terceira[chaveMes] = 0;
                    chamado[chaveMes] = 0;
                    if(data[key].contador==0){ primeira[chaveMes] = 1; }
                    if(data[key].contador==1){ segunda[chaveMes] = 1; }
                    if(data[key].contador==2){ terceira[chaveMes] = 1; }
                    if(data[key].contador>=3){ chamado[chaveMes] = 1; }
                }

                numberAt = number;
                i++;
            });

            Object.keys(valorDoDia).forEach(function(key,index) {
                
                colunas = [
                    { data:[9], label: 'Total' },
                    { data:[2],   label: '1' },
                    { data:[3],    label: '2' },
                    { data:[2],   label: '3' },
                    { data:[1],    label: 'chamados' }
                ];
            });
            console.log(colunas);
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
