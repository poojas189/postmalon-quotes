import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ToastController } from '@ionic/angular';
import { AdmobService } from '../services/admob.service';
import { DatahandlerService } from '../services/datahandler.service';
@Component({
  selector: 'app-quote-viewer',
  templateUrl: './quote-viewer.page.html',
  styleUrls: ['./quote-viewer.page.scss'],
})
export class QuoteViewerPage implements OnInit {
  selectedDetailQuote: any;
  favouriteArray: any;
  quotesData: any;
  selectedQuoteId: any;
  selectedQuotesData: any;
  quoteListArray: any[];
  isLoading: boolean;
  constructor(
    public route: ActivatedRoute,
    private socialSharing: SocialSharing,
    private http: HttpClient,
    private admobService: AdmobService,
    public datahandlerService: DatahandlerService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.admobService.showInterstitial();
    this.isLoading = true;
    this.checkQuoteInStorage();

    this.route.queryParamMap.subscribe(async (params: any) => {
      if (params.params.view == 'favourite') {
        this.quoteListArray = await this.datahandlerService.storage.get('favourite') || [];
        this.isLoading = false;
      } else {
        this.datahandlerService._dataConfigSubject.subscribe(value => {
          this.selectedQuoteId = value;
        });

        this.datahandlerService._quoteDatabaseSubject.subscribe(data => {

          this.quotesData = data;
          this.selectedQuotesData = this.quotesData.find(value => value.id === this.selectedQuoteId);

          if (this.selectedQuotesData) {
            this.quoteListArray = this.selectedQuotesData.quoteList;
            this.isLoading = false;
          }

        });
      }
    });

  }

  async updateFavouriteStorage(action, quote) {
    if (action === 'add') {
      this.favouriteArray.push(quote);
    } else if (action === 'remove') {
      const foundIndex = this.favouriteArray.indexOf(quote);
      if (foundIndex > -1) {
        this.favouriteArray.splice(foundIndex, 1);
      }
    }

    await this.datahandlerService.set('favourite', this.favouriteArray);
  }

  async checkQuoteInStorage() {
    this.favouriteArray = await this.datahandlerService.storage.get('favourite') || [];
  }

  onShare(quote) {
    this.socialSharing.share(quote.replace(/<br>/g, ''), 'Post Malone Quotes', null)
  }

  whatsappShare(quote) {
    this.socialSharing.shareViaWhatsApp(quote.replace(/<br>/g, ''), null, null);
  }

  checkIsFavourite(quote: string) {
    if (this.favouriteArray) {
      return this.favouriteArray.indexOf(quote) > -1;
    }
    return false;
  }

  async onCopyToClipboard(quote) {
    let aux = document.createElement('input');
    // removed br tag from string
    let tempQuote = quote.replace(/<br>/g, '');
    aux.setAttribute('value', tempQuote);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    document.body.removeChild(aux);
    this.presentToast('copied');
    // console.log('tempQuote', tempQuote);
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      position: 'bottom',
      cssClass: 'custom-toaster',
    });
    toast.present();
  }



}
