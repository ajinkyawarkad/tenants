import { Pipe, PipeTransform } from '@angular/core';
import firebase from 'firebase';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  public det=[];
  prod: any=[]; 
value:any;
public campid :any;

  constructor(public navParams: NavParams) {
    
    this.value = navParams.get('product');
    console.log(this.value);
    this.campid =this.value.cid;
    
    }
  ionViewDidLoad() {
    let currentuser=firebase.auth().currentUser;
    firebase.firestore().collection('Company').doc("COM#"+currentuser.uid).collection('Campaigns')
   .doc(this.value.cid).collection('leads').get().then((snaps) =>{
    snaps.docs.forEach(doc =>{
    this.det.push(doc.data());
    var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    console.log(source, " data: " );
    this.prod=this.det;
    console.log('HHHHHHH',this.prod);
})
})

  }



  transform(prod: any[], terms: string): any[] {
    this.prod.length = 0;
    if(!prod) return [];
    if(!terms) return prod;
    terms = terms.toLowerCase();
    return prod.filter( it => {
      return it.leads[0].action.toLowerCase().indexOf(terms.toLowerCase()) > -1 ||
             it.leads[1].action.toLowerCase().indexOf(terms.toLowerCase()) > -1  ||
             it.leads[2].action.toLowerCase().indexOf(terms.toLowerCase()) > -1 ||
             it.leads[3].action.toLowerCase().indexOf(terms.toLowerCase()) > -1  
            
            
    });
  }
}
