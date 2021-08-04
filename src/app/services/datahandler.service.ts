import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class DatahandlerService {
  private _storage: Storage | null = null;
  
  public _dataConfigSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public dataConfig: Observable<any>;

  public _singleQuoteSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public quoteConfig: Observable<any>;

  public _selectedQuoteSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public selectedQuote: Observable<any>;

  public _quoteDatabaseSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public quoteDatabase: Observable<any>;

  constructor(public storage: Storage) {
    this.init();
    this.dataConfig = this._dataConfigSubject.asObservable();
    this.selectedQuote = this._selectedQuoteSubject.asObservable();
    this.quoteConfig = this._singleQuoteSubject.asObservable();
    this.quoteDatabase = this._quoteDatabaseSubject.asObservable();
   }

   async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }
}
