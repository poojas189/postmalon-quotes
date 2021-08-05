
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AdmobService } from './services/admob.service';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,AngularFireDatabaseModule, IonicStorageModule.forRoot(),
     IonicModule.forRoot({ animated: false }), AppRoutingModule],
  providers: [
    StatusBar,
    LocalNotifications,
    AdMobFree,
    AdmobService,
    SplashScreen,
    TextToSpeech,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
