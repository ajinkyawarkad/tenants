import { Component,ViewChild  } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { CreateNewCampleadPage } from '../create-new-camplead/create-new-camplead';
import { Http } from '@angular/http';

import {HttpClient, HttpParams, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from "rxjs";
import { HttpHeaders } from '@angular/common/http';
import { CSVRecord } from '../../models/CSVModel'; 

//declare var testvar;



@Component({
  selector: 'page-create-campaigns-lead',
  templateUrl: 'create-campaigns-lead.html',
})
export class CreateCampaignsLeadPage {
 
  
  public array: any = [];

  
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    
    this.array = navParams.get('array');
    console.log(this.array);

  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCampaignsLeadPage');
  }
 
  create()
  {
    this.navCtrl.push(CreateNewCampleadPage);  
  }
}
