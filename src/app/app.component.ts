import { AdmobService } from './services/admob.service';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { filter, map, mergeMap } from 'rxjs/operators';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AlertController, MenuController, NavController, Platform } from '@ionic/angular';
import { DatahandlerService } from './services/datahandler.service';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  headerLabel: any;
  displayHomeIcon = false;
  displayBackIcon = false;
  quotesData: any;
  selectedQuoteId: any;
  categoryTitle: any;
  paymentProcessing = false;

  constructor(private menu: MenuController,
    public menuCtrl: MenuController,
    public router: Router,
    private socialSharing: SocialSharing,
    private alertController: AlertController,
    public navCtrl: NavController,
    private platform: Platform,
    private admobService: AdmobService,
    private splashScreen: SplashScreen,
    public datahandlerService: DatahandlerService,
    public dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private statusBar: StatusBar,) {

    this.initializeApp();
    this.loadJsonData();
    this.internetListerners();
    this.datahandlerService._dataConfigSubject.subscribe(value => {
      if (value && this.quotesData) {
        this.categoryTitle = this.quotesData.find(elem => elem.id === value).title;
      }
    });
  }

  ngOnInit(): void {
    this.router.navigate(['/category']);
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString("#cc931f");
      this.splashScreen.hide();
      this.fetchRouteData();
      this.exipAppSubscription();
      this.admobService.showBanner();
    });
  }

  loadJsonData() {
    this.datahandlerService._quoteDatabaseSubject.subscribe(data => {
      this.quotesData = data;
    });
  }

  fetchRouteData() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap((route) => route.data))
      .subscribe((event) => {
        this.headerLabel = event.title;
      });

    this.router.events.subscribe(events => {
      if (events instanceof NavigationEnd) {
        var snapshot = this.router.routerState.snapshot;
        var params = snapshot.root.data;
        switch (events.url) {
          case "/quote-viewer":
            this.displayHomeIcon = true;
            this.displayBackIcon = true;
            break;
          case "/more-apps":
            this.displayHomeIcon = false;
            this.displayBackIcon = true;
            break;
          case "/quote-viewer?view=favourite":
            this.displayHomeIcon = false;
            this.displayBackIcon = true;
            this.headerLabel = 'Favourite';
            break;
          default:
            this.displayBackIcon = false;
            this.displayHomeIcon = false;
            break;
        }
      }
    });
  }

  exipAppSubscription() {
    this.platform.backButton.subscribe(async () => {
      let isExit = (window.location.pathname == "/category");

      if (isExit) {
        let rateValue = await this.datahandlerService.storage.get('isRated') || false;
        if (rateValue) {
          const alert = await this.alertController.create({
            header: 'Are you sure you want to exit?',
            buttons: [{
              text: 'NO'
            }, {
              text: 'YES',
              handler: () => {
                navigator['app'].exitApp();
              }
            }]
          });
          await alert.present();

        } else {
          const alert = await this.alertController.create({
            header: 'Show your Love by Giving 5 Stars! Thank You.',
            buttons: [{
              text: 'Rate Us',
              handler: () => {
                this.onRateFromExit();
              }
            }, {
              text: 'EXIT',
              handler: () => {
                navigator['app'].exitApp();
              }
            }]
          });
          await alert.present();
        }
      }
    });
  }

  onGoBack() {
    this.admobService.showInterstitial();
    this.navCtrl.pop();
  }

  internetListerners() {
    window.addEventListener('offline', async () => {
      this.noInternetAlert();
    });

    window.addEventListener('online', () => {
      this.alertController.dismiss();
    });
  }

  async noInternetAlert() {

    const alert = await this.alertController.create({
      header: 'No Internet Connection',
      subHeader: 'You are offline please check your internet connection',
      buttons: [{
        text: 'Ok',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    });
    await alert.present();
  }

  toggleMenu() {
    this.menu.toggle();
  }

  onSelectCategory() {
    this.menuCtrl.toggle();
    this.router.navigate(['/category']);
  }

  onGoToFavourite() {
    this.menuCtrl.toggle();
    this.router.navigate(['/quote-viewer'], { queryParams: { view: 'favourite' } });
  }

  async onRateFromExit() {
    await this.datahandlerService.set('isRated', true);
    if (this.platform.is('android')) {
      window.open('http://play.google.com/store/apps/details?id=com.corlogix.postmalone', '_system');
    } else if (this.platform.is('ios')) {
      window.open('https://itunes.apple.com/gb/com.corlogix.postmalone', '_system');
    }
  }

  onRateUs() {
    this.menuCtrl.toggle();
    if (this.platform.is('android')) {
      window.open('http://play.google.com/store/apps/details?id=com.corlogix.postmalone', '_system');
    } else if (this.platform.is('ios')) {
      window.open('https://itunes.apple.com/gb/com.corlogix.postmalone', '_system');
    }
  }

  ShareGeneric() {
    this.menuCtrl.toggle();
    this.socialSharing.share('Download the app Post Malone Quotes \nFor Android http://play.google.com/store/apps/details?id=com.corlogix.postmalone', 'Post Malone Quotes', null)
  }

  onMoreApps() {
    this.menuCtrl.toggle();
    this.router.navigate(['/more-apps']);
  }

  onHome() {
    this.router.navigate(['/category']);
  }




}
