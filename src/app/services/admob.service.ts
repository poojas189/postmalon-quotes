
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free/ngx';
import { DatahandlerService } from './datahandler.service';
import { AngularFireDatabase } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class AdmobService {

  bannerConfig: AdMobFreeBannerConfig;
  interstitialConfig: AdMobFreeInterstitialConfig;

  isIntervalEnd = true;
  displayAds: any;

  constructor(public platform: Platform,
    private db: AngularFireDatabase,
    public datahandlerService: DatahandlerService,
    private admobFree: AdMobFree) {

    this.bannerConfig = {
      isTesting: true,
      autoShow: true,
      // id: 'ca-app-pub-5152650426066889/3389309734'
    };

    this.interstitialConfig = {
      isTesting: true,
      autoShow: false,
      // id: 'ca-app-pub-5152650426066889/7480597984'
    };

    this.db.object('showAds').valueChanges().subscribe(res => {
      this.displayAds = res;

      if (this.displayAds) {
        platform.ready().then(() => {
          this.admobFree.banner.config(this.bannerConfig);
          this.showBanner();
          if (this.interstitialConfig) {
            this.loadInterstitialAd();
          }
        });
      }

    });
  }

  showBanner() {
    if (this.displayAds) {
      this.admobFree.banner.prepare().then(() => {
        console.log('BANNER LOADED');
      }).catch(e =>
        console.log('PROBLEM LOADING BANNER: ', e)
      );
    }
  }

  hideBanner() {
    this.admobFree.banner.hide();
  }

  loadInterstitialAd() {
    this.admobFree.interstitial.config(this.interstitialConfig);
    this.admobFree.interstitial.prepare().then(() => {
      console.log('*********INTERSTIAL LOADED');
    }).catch(e =>
      console.log('PROBLEM LOADING INTERSTITIAL: ', e)
    );
  }

  showInterstitial() {
    if (this.isIntervalEnd && this.displayAds) {
      //CHECK AND SHOW INTERSTITIAL
      this.admobFree.interstitial.isReady().then(() => {
        // console.log('******** AD IS READY!');
        this.admobFree.interstitial.show().then(() => {
          // console.log('********* INTERSTIAL DISPLAYED');
          this.loadInterstitialAd();
        })
          .catch(e => console.log('PROBLEM LOADING REWARD VIDEO: ', e));
      })
        .catch(e => console.log('PROBLEM LOADING REWARD VIDEO: ', e));

      this.isIntervalEnd = false;

      setTimeout(() => {
        this.isIntervalEnd = true;
      }, 15000);

    }

  }

}
