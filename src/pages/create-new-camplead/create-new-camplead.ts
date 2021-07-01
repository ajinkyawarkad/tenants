import { Component } from "@angular/core";
import { AlertController, NavController, NavParams } from "ionic-angular";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from "@angular/forms";
import firebase from "firebase";
import { Observable } from "rxjs";
import { Lead } from "../../models/user";
import { Storage } from "@ionic/storage";
import { v4 as uuid } from "uuid";
import { data } from "jquery";
import { LeadsDetailsPage } from "../leads-details/leads-details";
import { HomePage } from "../home/home";

interface Camps {
  name: string;
}

@Component({
  selector: "page-create-new-camplead",
  templateUrl: "create-new-camplead.html",
})
export class CreateNewCampleadPage {
  hideMe = false;
  public form: FormGroup;
  products: Observable<Camps[]>;
  productss: Observable<Camps[]>;

  lead = {} as Lead;

  public anArray: any = [];
  public anArray2: any = [];
  public det: any = [];
  public hed: any = [];
  value: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private storage: Storage
  ) {
    this.value = this.navParams.get("campid");
    console.log("camp id", this.value);
  }

  ionViewDidLoad() {
    let currentuser = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("Company")
      .doc(currentuser.photoURL)
      .collection("Campaigns")
      .doc(this.value)
      .onSnapshot((doc) => {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source, " data: ");
        this.products = doc.data().CSVfield;

        console.log("csv ", this.products);
        let test: any = [];
        test = this.products;
        for (var a in test) {
          if (test[a].indicator !== "None") {
            this.anArray.push(test[a]);
          } else {
            this.anArray2.push(test[a]);
          }
        }
      });

    firebase
      .firestore()
      .collection("Company")
      .doc(currentuser.photoURL)
      .collection("Admin")
      .doc(currentuser.uid)
      .onSnapshot((doc) => {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source, " data: ");
        this.productss = doc.data().Users;
        console.log(this.productss);
      });
    console.log("ionViewDidLoad CreateNewCampleadPage");
  }
  hide() {
    this.hideMe = true;
  }

  insertLead(data) {
    // if(camp.name && camp.goals && camp.manager && camp.sr != null){
    this.storage
      .get("cuid")
      .then((val) => {
        console.log("id is", val);
        let uuid1 = uuid();
        console.log("uuid", uuid);
        console.log("camp id", this.value.cid);
        console.log("data", data);

        for (var a in this.anArray) {
          firebase
            .firestore()
            .collection("Company")
            .doc(val)
            .collection("Campaigns")
            .doc(this.value)
            .collection("leads")
            .doc(uuid1)
            .set(
              {
                [this.anArray[a].indicator]: this.anArray[a].action,
              },
              { merge: true }
            );
        }

        firebase
          .firestore()
          .collection("Company")
          .doc(val)
          .collection("Campaigns")
          .doc(this.value)
          .collection("leads")
          .doc(uuid1)
          .set(
            Object.assign({
              leads: this.anArray2,
              SR_id: data.id,
              SR_name: data.name,
              uid: uuid1,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            }),
            { merge: true }
          )
          .then(() => {
            let alert = this.alertCtrl.create({
              title: "Success",
              subTitle: "Lead added Successfully",
              //scope: id,
              buttons: [
                {
                  text: "OK",
                  handler: (data) => {
                    this.navCtrl.push(HomePage);
                  },
                },
              ],
            });
            alert.present();
          });
      })
      .catch((err) => {
        console.log(err);
        let alert = this.alertCtrl.create({
          //title: 'Error',
          subTitle: "Problem in adding Lead",
          buttons: [{ text: "OK", handler: (data) => {} }],
        });
        alert.present();
      });
  }
}
