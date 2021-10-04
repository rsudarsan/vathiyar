import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
// import global service
import { HttpGlobalService } from 'src/app/services/httpglobal.service';
import { ValuesService } from 'src/app/services/values.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

import { TabContentComponent } from './tab-content/tab-content.component';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  providers: [NgbDropdownConfig]

})
export class ServiceCardComponent implements OnInit {

  public cardList: any;
  public page = 1;
  public pageSize:number = 10;
  public totNoOfPages: number;

  public selectedTab: any = 'Open';
  public filteredBookingList: any;
  public tabLists: any;
  public openfilteredList: any;
  public pendingfilteredList: any;
  public inprogressfilteredList: any;
  public completedfilteredList: any;
  

  constructor(private _gs: HttpGlobalService,
    private _router: Router,
    private _val: ValuesService,
    private _ws: WorkspaceService) { }

  ngOnInit(): void {
    console.log("getall services");
    this._ws.getBookings();
      setTimeout(()=>{
            var bookingsList = [];
            for (let i = 0; i < this._val.BOOKINGS.length; i++) {
              var tot = 0;
              for (let j = 0; j < this._val.BOOKINGS[i].BOOKING_DETAILS.length; j++) {
                tot = tot + this._val.BOOKINGS[i].BOOKING_DETAILS[j].SERVICE_PRICE_WITH_QTY
              }
              bookingsList.push({
                  "_id": this._val.BOOKINGS[i]._id,
                  "BOOKING_ID": this._val.BOOKINGS[i].BOOKING_ID,
                  "CUSTOMER_ID": this._val.BOOKINGS[i].CUSTOMER_ID,
                  "PAYMENT_ID": this._val.BOOKINGS[i].PAYMENT_ID,
                  "BOOKING_DT": this._val.BOOKINGS[i].BOOKING_DT,
                  "SERVICE_DT": this._val.BOOKINGS[i].SERVICE_DT,
                  "BOOKING_STATUS": this._val.BOOKINGS[i].BOOKING_STATUS,
                  "COMMENTS": this._val.BOOKINGS[i].COMMENTS,
                  "CREATED_AT": this._val.BOOKINGS[i].CREATED_AT,
                  "CUSTOMER_NAME": this._val.BOOKINGS[i].CUSTOMER_NAME,
                  "CUSTOMER_PH_NO": this._val.BOOKINGS[i].CUSTOMER_PH_NO,
                  "PAYMENT_TYPE":this._val.BOOKINGS[i].PAYMENT_TYPE,
                  "TOT_SERVICE_PRICE": tot
                })
              
            }
            // console.log(bookingsList);
            this.cardList = bookingsList;     
            this.filterList(); 
            this.selectTab('Open', 'Open Bookings');   
            
      },500);
  }

  ngAfterContentInit() {
    this.filteredBookingList = this.openfilteredList;
    this.totNoOfPages = Math.ceil(this.filteredBookingList.length/this.pageSize);
    this.selectTab('Open', 'Open Bookings'); 
  }

  selectTab(selectedTabValue: any, selectedTabName: any){
    if(selectedTabValue === 'Open'){
      this.selectedTab = selectedTabName;
      this.filteredBookingList = this.openfilteredList;
    } else if (selectedTabValue === 'Pending'){
      this.selectedTab = selectedTabName;
      this.filteredBookingList = this.pendingfilteredList;
    } else if (selectedTabValue === 'Inprogress'){
      this.selectedTab = selectedTabName;
      this.filteredBookingList = this.inprogressfilteredList;
    } else if (selectedTabValue === 'Completed'){
      this.selectedTab = selectedTabName;
      this.filteredBookingList = this.completedfilteredList;
    }
  }

  filterList(){
    if(this.cardList){      
      this.openfilteredList =  this.cardList.filter(function(booking) {
        return booking.BOOKING_STATUS === 'Open';
        }
      );
      this.pendingfilteredList =  this.cardList.filter(function(booking) {
        return booking.BOOKING_STATUS === 'Pending';
        }
      );
      this.inprogressfilteredList =  this.cardList.filter(function(booking) {
        return booking.BOOKING_STATUS === 'Inprogress';
        }
      );
      this.completedfilteredList =  this.cardList.filter(function(booking) {
        return booking.BOOKING_STATUS === 'Completed';
        }
      );

      this.tabLists = [{
        name: 'Open Bookings',
        value: 'Open',
        count: this.openfilteredList.length
      },
      {
        name: 'Pending for Acceptance',
        value: 'Pending',
        count: this.pendingfilteredList.length
      },
      {
        name: 'In Progress',
        value: 'Inprogress',
        count: this.inprogressfilteredList.length
      },
      {
        name: 'Completed',
        value: 'Completed',
        count: this.completedfilteredList.length
      }];
    }
  }

}
