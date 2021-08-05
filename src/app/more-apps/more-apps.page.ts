import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-more-apps',
  templateUrl: './more-apps.page.html',
  styleUrls: ['./more-apps.page.scss'],
})
export class MoreAppsPage implements OnInit {

  myApps = [
    {
      appName: "Love Quotes",
      imagesrc: "assets/images/love-quotes.png",
      navigationLink: "https://play.google.com/store/apps/details?id=com.corlogix.lovequotes"
    },
    {
      appName: "Good Morning Messages",
      imagesrc: "assets/images/gm.png",
      navigationLink: "https://play.google.com/store/apps/details?id=com.corlogix.gmwife"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  navigateToApp(link) {
    window.open(link, '_system');
  }

}
