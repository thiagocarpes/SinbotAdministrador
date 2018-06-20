import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  usuario: String;
  senha: String;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  login(){
    if(this.usuario == "admin" && this.senha == "admin"){
      this.navCtrl.push(TabsPage);
    }else{
      let alert = this.alertCtrl.create({
        title: 'Usuário ou senha inválidos',
        subTitle: 'Não foi possível altenticar o usuário informado. Favor tentar novamente.',
        buttons: ['Tentar Novamente']
      });
      alert.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
