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
@ViewChild("lineCanvas") lineCanvas: ElementRef;

private barChart: Chart;
private doughnutChart: Chart;
private lineChart: Chart;
public hideMe1: boolean = false;
public hideMe2: boolean = false;
userInfo: any;
products: any;
pro=[];
productss: any;
call = [];
statuss:any=[];
campId;
count;

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
      console.log(this.count)
      
    })
console.log(data);

}
ngOnInit() {

let currentuser = firebase.auth().currentUser;
this.userInfo = this.afs.collection("Company").doc("COM#" + currentuser.uid).collection("Campaigns");
this.products = this.userInfo.valueChanges();

this.barChart = new Chart(this.barCanvas.nativeElement, {
type: "bar",
data: {
labels: ["Pending Call ", "Pending Meeting"],
datasets: [
{
label: "# of Votes",
data: [this.call],
backgroundColor: [
"rgba(255, 99, 132, 0.2)",
"rgba(54, 162, 235, 0.2)",

],
borderColor: [
"rgba(255,99,132,1)",
"rgba(54, 162, 235, 1)",
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

// this.lineChart = new Chart(this.lineCanvas.nativeElement, {
// type: "line",
// data: {
// labels: ["January", "February", "March", "April", "May", "June", "July"],
// datasets: [
// {
// label: "My First dataset",
// fill: false,
// lineTension: 0.1,
// backgroundColor: "rgba(75,192,192,0.4)",
// borderColor: "rgba(75,192,192,1)",
// borderCapStyle: "butt",
// borderDash: [],
// borderDashOffset: 0.0,
// borderJoinStyle: "miter",
// pointBorderColor: "rgba(75,192,192,1)",
// pointBackgroundColor: "#fff",
// pointBorderWidth: 1,
// pointHoverRadius: 5,
// pointHoverBackgroundColor: "rgba(75,192,192,1)",
// pointHoverBorderColor: "rgba(220,220,220,1)",
// pointHoverBorderWidth: 2,
// pointRadius: 1,
// pointHitRadius: 10,
// data: [65, 59, 80, 81, 56, 55, 40],
// spanGaps: false
// }
// ]
// }
// });
}

}