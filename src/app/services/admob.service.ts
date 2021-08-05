
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

  isIntervalEnd: boolean = true;
  displayAds: any;
  adConfig: any;

  constructor(public platform: Platform,
    private db: AngularFireDatabase,
    public datahandlerService: DatahandlerService,
    private admobFree: AdMobFree) {

    this.db.object('postmaloneAdsConfig').valueChanges().subscribe(res => {
      this.adConfig = res;
      // console.log(this.adConfig);
      this.displayAds = this.adConfig.showAds;

      this.bannerConfig = {
        // isTesting: true,
        autoShow: true,
        id: this.adConfig.bannerID
      };
      this.interstitialConfig = {
        // isTesting: true,
        autoShow: false,
        id: this.adConfig.interID
      }

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
      }, 20000);

    }

  }

}
