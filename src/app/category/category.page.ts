import { DatahandlerService } from './../services/datahandler.service';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit, AfterViewInit {
  @ViewChild(IonContent) content: IonContent;
  quotesData: any;

  constructor(private http: HttpClient, public datahandlerService: DatahandlerService,
    public router: Router, public dataService: DataService) { }

  ngAfterViewInit(): void {
    this.content.scrollToTop();
  }

  ngOnInit() {
    this.datahandlerService._quoteDatabaseSubject.subscribe(data => {
      this.quotesData = data;
    });
  }

  navigateToQuotelist(id) {
    // console.log(id);
    this.router.navigate(['/quote-viewer']);
    this.datahandlerService._dataConfigSubject.next(id);
  }



}
