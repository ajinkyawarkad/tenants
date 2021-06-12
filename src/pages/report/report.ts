import { Component, ElementRef, ViewChild, } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase';

@Component({
selector: 'page-report',
templateUrl: 'report.html',
})
export class ReportPage {
@ViewChild("barCanvas") barCanvas: ElementRef;
@ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;

private barChart: Chart;
// private doughnutChart: Chart;

public hideMe1: boolean = false;
public hideMe2: boolean = false;
userInfo: any;
products: any;
productss: any;
manager:any;
SR:any;
pro=[];

statuss:any=[];
campId;
userId;
campName=[];
count;
public labell:any;

constructor(public navCtrl: NavController, public afs: AngularFirestore, public navParams: NavParams) {
}

hide1() {
this.hideMe1 = !this.hideMe1;
}

hide2() {
this.hideMe2 = !this.hideMe2;
}

ionViewDidLoad() {
console.log('ionViewDidLoad ReportPage');
}

selecteduser(user)
{
  console.log("selcted user",user);
  this.userId=user.id;

  let currentuser = firebase.auth().currentUser
  firebase
.firestore()
.collection("Company")
.doc("COM#" + currentuser.uid)
.collection("Users")
.doc(this.userId)
.collection("CampsAsso")
.get().then(doc =>
{
  doc.docs.forEach(snap =>{
    this.campName.push(snap.data().name);
    
  })
  console.log(this.campName)
this.count = doc.size
console.log(this.count);
console.log(doc);

this.chart(this.count)

})  


  
}

status(selectedcamp){
console.log(selectedcamp.cid);
this.productss=selectedcamp.status
this.campId=selectedcamp.cid

console.log(this.productss);
this.pro =[];
for(let i=0;i<this.productss.length;i++)
{
this.pro.push(this.productss[i].status)
console.log(this.pro)
}
}

selectedstatus(data){
this.labell=data;  
let currentuser = firebase.auth().currentUser
firebase
.firestore()
.collection("Company")
.doc("COM#" + currentuser.uid)
.collection("Campaigns")
.doc(this.campId)
.collection("leads").where("status",'==',data).get().then(doc =>
{
this.count = doc.size
console.log(this.count);

this.chart(this.count)

})  
console.log(data);

}

chart(count)
{
  this.barChart = new Chart(this.barCanvas.nativeElement, {
    type: "bar",
    data: {
    labels: ["Status"],
    datasets: [
    {
    label: this.labell,
    data: [count],
    backgroundColor: [
    "rgba(255, 99, 132, 0.2)",
    ],
    borderColor: [
    "rgba(255,99,132,1)",
    ],
    borderWidth: 1
    }
    ]
    },
    options: {
    scales: {
    yAxes: [
    {
    ticks: {
    beginAtZero: true
    }
    }
    ]
    }
    }
    });


  
}
ngOnInit() {

let currentuser = firebase.auth().currentUser;
this.userInfo = this.afs.collection("Company").doc("COM#" + currentuser.uid).collection("Campaigns");
this.products = this.userInfo.valueChanges();

firebase
.firestore()
.collection("Company")
.doc("COM#" + currentuser.uid)
.collection("Admin")
.doc(currentuser.uid)
.onSnapshot((doc) => {
  var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
  console.log(source, " data: ");
  this.manager = doc.data().Managers;
  console.log(this.manager);
});


firebase
.firestore()
.collection("Company")
.doc("COM#" + currentuser.uid)
.collection("Admin")
.doc(currentuser.uid)
.onSnapshot((doc) => {
  var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
  console.log(source, " data: ");
  this.SR = doc.data().Users;
  console.log(this.SR);
});

// this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
// type: "doughnut",
// data: {

// datasets: [
// {
// label: "# of Votes",
// data: [12, 19, 3, 5, 2, 3],
// backgroundColor: [
// "rgba(255, 99, 132, 0.2)",
// "rgba(54, 162, 235, 0.2)",
// "rgba(255, 206, 86, 0.2)",
// "rgba(75, 192, 192, 0.2)",
// "rgba(153, 102, 255, 0.2)",
// "rgba(255, 159, 64, 0.2)"
// ],
// hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
// }
// ],
// labels: ["Interested", "CallBack", "Not Reachable", "Paid User", "Invalid Contacts", "Not Interested"]
// }
// });


}

}