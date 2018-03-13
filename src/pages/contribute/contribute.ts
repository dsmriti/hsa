import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { WithdrawalPage } from './../withdrawal/withdrawal';
import { ContriModalPage } from './../contri-modal/contri-modal';
import { FormControl, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms';
import {  OnInit } from '@angular/core';
/**
 * Generated class for the ContributePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contribute',
  templateUrl: 'contribute.html',
})
export class ContributePage implements OnInit {

  user: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContributePage');
    this.companyContribution(2,0);
  }

  openModal(characterNum) {
    let modal = this.modalCtrl.create(ContriModalPage, characterNum);
    modal.present();
  }
 
  movetowithdrawal(){
    this.navCtrl.push(WithdrawalPage);
  }
  
  ngOnInit() {
    this.user = new FormGroup({
      amount: new FormControl('0'),
      contri: new FormControl('', [Validators.required, Validators.max(3750)])
    });
  }

  companyContribution(yourCoverageType, yourAge){
    let Tiers_SeedMoney_Limits = JSON.parse(localStorage.getItem("Tiers_SeedMoney_Limits"));
    let irsCatchup:any;
    let companyContri = Tiers_SeedMoney_Limits[yourCoverageType].input_cocontribSQL;
    let irsLimit = Tiers_SeedMoney_Limits[yourCoverageType].input_IRSreglimitSQL;
    if(yourAge == 1){
        irsCatchup = Tiers_SeedMoney_Limits[yourCoverageType].input_IRScatchupSQL;
    }else{
        irsCatchup = "0";
    }    
  }
}
