import { Component } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pushes: any = [];
  products: any[];


  token; 

  constructor(private fcm: FCM, public plt: Platform, private router: Router
    ) {
    this.plt.ready()
    .then(() => {
      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        const dataStr = JSON.stringify(data);
        JSON.parse(dataStr, (key, value) => {
          console.log(key);
          console.log(value);
        });

        if (data.wasTapped) {
          console.log('Received in background');
          // this.router.navigate([data.landing_page, data.price]);
        } else {
          console.log('Received in foreground');
          // this.router.navigate([data.landing_page, data.price]);
        }
      });

      this.fcm.getToken().then(token => {
        console.log(token);
        this.token = token;
      });

      // this.fcm.onTokenRefresh().subscribe(token => {
      //   alert(token);
      //   this.token = token;
      //   // Register your new token in your back-end if you want
      //   // backend.registerToken(token);
      // });
    })
  }

  // subscribeToTopic() {
  //   this.fcm.subscribeToTopic('enappd');
  // }
  // getToken() {
  //   this.fcm.getToken().then(token => {
  //     // Register your new token in your back-end if you want
  //     // backend.registerToken(token);
  //   });
  // }
  // unsubscribeFromTopic() {
  //   this.fcm.unsubscribeFromTopic('enappd');
  // }

}
