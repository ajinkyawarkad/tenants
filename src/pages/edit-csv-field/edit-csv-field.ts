import { Component } from '@angular/core';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-edit-csv-field',
  templateUrl: 'edit-csv-field.html',
})
export class EditCsvFieldPage {

  products:any;
  campid:any;
  anArray:any=[];
  arr:any=[];

  arrFilelds = [
    "Select",
    "None",
    "Id",
    "Salutation",
    "first_name",
    "middle_name",
    "last_name",
    "Full_Name",
    "Email",
    "Phone",
    "Address",
    "City",
    "State",
    "Country",
    "Gender",
    "Company_Name",
    "Position",
    "Profile_URL",
    "Date_of_Birth",
    "Apartment",
    "Zip",
    "Fax",
    "Price",
    "Stage",
    "Quality",
    "Currency",
    "Other_Contact",
  ];
  dummy=[]

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController) {

    this.campid = navParams.get("campid");
    
  }
  Add(){
   
    //this.arr.push({'value':'','action':' '}); 
    // if (this.arr.length < 5) {
    //   this.arr.push({ value: "", action: "" });
    // } else {
    //   alert("you reached to limit.. ");
    // }
    this.anArray.push({ value: "",  });

    }


    remove(idx)
    {
      this.anArray.splice(idx, 1);
    }



  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCsvFieldPage');
    let currentuser=firebase.auth().currentUser;
    firebase.firestore().collection('Company').doc(currentuser.photoURL).collection('Campaigns').doc(this.campid).onSnapshot((doc) => {
      var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      console.log(source, " data: "); 
      this.products =  doc.data().CSVfield ; 
      console.log("csv ",this.products) ;
      this.anArray=this.products 
  });
  for(var i in this.anArray){
    let a = this.arrFilelds.indexOf(this.anArray[i]);
    this.arrFilelds.splice(a, 1);

  }
  for(var r in this.anArray){
    this.dummy.push({indicator:this.anArray[r].indicator})

  }


  }

  removeField(valuee ,att) {
    console.log(valuee , att);
    
    let b = att;
    if (b) {
     
      let s = this.arrFilelds.includes(att);
     
     
      switch (s) {
        case true:
          let f;
          let a ;
         

          // let f = this.dummy.includes({indicator:att});
          for(var t in this.dummy){
            if(this.dummy[t].indicator == att){
              f= true
              a = t
              break;

            }else{
              f = false
              
              
            }

          }
          console.log("fa",f)
            switch(f){
              case false:
                // this.dummy.push(att)
                this.dummy[valuee].indicator = att
                console.log("false Dummy", this.dummy)
                console.log("False Anarray", this.anArray);
                break;
              case true:
                alert("Duplicate Fields not allowed")
                
                console.log("indessss", a)

                this.dummy[a].indicator = ""
                this.anArray[a].indicator = ""
                this.anArray[valuee].indicator = att
                this.dummy[valuee].indicator = att

                console.log("true Dummy", this.dummy)
                console.log("true anArray", this.anArray);
        
            }

          break;

        case false:
          alert("Something went  Wrong")
          break;
      }
    } else {
      console.log("Bllank");
    }   
  }



  savefield()
  {
     //let Mainheader =this.anArray;
 
    //console.log("EDITED/Added",this.arr); 
   
    let currentUser = firebase.auth().currentUser;
    // firebase.firestore().collection('Company').doc(currentUser.photoURL).collection('Campaigns').doc(this.campid)
    // .collection('leads').get().then(dat =>{
    //   dat.docs.forEach(snap => 
    //     {
    //       for(var z in this.anArray){
    //         firebase.firestore().collection('Company').doc(currentUser.photoURL).collection('Campaigns').doc(this.campid)
    //         .collection('leads').doc(snap.data().uid).update({
    //           leads:firebase.firestore.FieldValue.arrayUnion(
    //             this.anArray[z]
    //           )
    //         })

    //       }
  
    //     })
    // })

  for(var x in this.anArray){
    firebase.firestore().collection('Company').doc(currentUser.photoURL).collection('Campaigns').doc(this.campid)
    .update({
      CSVfield:firebase.firestore.FieldValue.arrayUnion(
        this.anArray[x]
      )
    })

  }

 
    let alert = this.alertCtrl.create({
      title: 'Sucess',
      subTitle: ' Field Updated Successfully .. ',
      buttons: [
        {text: 'OK',
                handler: data => {
                  this.navCtrl.push(HomePage)
                }  
              },  
            ]
            });
    alert.present();
    
  }




}