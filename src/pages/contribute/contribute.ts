import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { WithdrawalPage } from './../withdrawal/withdrawal';
import { ContriModalPage } from './../contri-modal/contri-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-contribute',
  templateUrl: 'contribute.html',
})
export class ContributePage {
  contributeForm: FormGroup;
  submitAttempt:boolean=false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public modalCtrl: ModalController,
			  private alertCtrl: AlertController) {

    this.contributeForm = formBuilder.group({
      c_h:['', Validators.compose([Validators.maxLength(20),Validators.required])],
      a_c: ['', Validators.compose([Validators.maxLength(20),Validators.required])],
    });
    }

  company_contri: any;
  current_hsa : any;
  annual_contri: number;
  companyContri: number;
  above_55: number;
  under_55: number;
  annual_contri_value: any;
  exceed_value:any;
  coverageType: number;
  age: any;
  data4 : any;
  data5: any ;

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContributePage');
    // console.log(this.navParams);
    let tiersSeedMoney: Object;
    this.coverageType = parseInt(sessionStorage.getItem("coverageType"));
    this.age = parseInt(sessionStorage.getItem("age"));

    tiersSeedMoney = this.companyContribution(this.coverageType,this.age);
    console.log(tiersSeedMoney);
    this.company_contri = this.companyContribution(this.coverageType, this.age);
    console.log(this.above_55);
    console.log(this.under_55);
    console.log(this.age);
    console.log(this.coverageType);
  }

  openModal(characterNum){
    let modal = this.modalCtrl.create(ContriModalPage, characterNum);
    modal.present();
  }
  
checkContri()
{
if(this.annual_contri_value === '0')
		  	this.annual_contri_value='';
}

checkHsa()
{
if(this.current_hsa === '0')
		  	this.current_hsa='';
}

  contri()
  {
  if(this.annual_contri_value=='')
	{
	this.annual_contri_value='0';
	}
  }
  currHsa()
  {
  if(this.current_hsa=='')
	{
	this.current_hsa='0';
	}
  }

  movetowithdrawal(){
    this.submitAttempt = true;
    if(this.contributeForm.valid){
      if (this.annual_contri_value > this.annual_contri) {
        this.presentAlert("Your Annual Contribution should be less than "+ this.annual_contri);
      }
      else{
        this.exceed_value=""
        this.navCtrl.push(WithdrawalPage,{
          data1:this.current_hsa,
          data2:this.company_contri,
          data3:this.annual_contri_value,
        });
        var current_hsa_input = String(this.current_hsa);
        sessionStorage.setItem("current_hsa_input", current_hsa_input);
        var company_contribution = String(this.company_contri);
        sessionStorage.setItem("company_contribution", company_contribution);
        var annual_contri = String(this.annual_contri_value);
        sessionStorage.setItem("annual_contri", annual_contri);
        }
    }
    }


presentAlert(data) {
  let alert = this.alertCtrl.create({
    title: 'Error',
    subTitle: data,
    buttons: ['Ok']
  });
  alert.present();
}


  companyContribution(yourCoverageType, yourAge){
    let Tiers_SeedMoney_Limits = JSON.parse(localStorage.getItem("Tiers_SeedMoney_Limits"));
    let companyContri = Tiers_SeedMoney_Limits[yourCoverageType].input_cocontribSQL;
    let irsLimit = Tiers_SeedMoney_Limits[yourCoverageType].input_IRSreglimitSQL;
    var irsLimit_input = String(irsLimit);
    sessionStorage.setItem("irsLimit_input", irsLimit_input);
    let irsCatchup = Tiers_SeedMoney_Limits[yourCoverageType].input_IRScatchupSQL;
    if(yourAge == 1){
      this.annual_contri = companyContri + irsLimit + irsCatchup;
    }else{
      irsCatchup = 0;
      this.annual_contri = companyContri + irsLimit;
    }
    var irsCatchup_input = String(irsCatchup);
    sessionStorage.setItem("irsCatchup_input", irsCatchup_input);
    return companyContri;
    }
}
