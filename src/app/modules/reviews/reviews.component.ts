import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
// import global service
import { HttpGlobalService } from 'src/app/services/httpglobal.service';
import { ValuesService } from 'src/app/services/values.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  providers: [NgbDropdownConfig]
  
})
export class ReviewsComponent implements OnInit {

  public reviewsList:any = [];
  public page: number = 1;
  public term: string;
  public totNoOfPages: number;
  public pageSize: number = 10;
  public responseMsg: string;

  constructor(private _gs: HttpGlobalService, 
              private _router: Router,
              private _val: ValuesService,
              private _ws:WorkspaceService) {}

  public ngOnInit(): void {
      this._ws.getAllReviews();
      setTimeout(()=>{
        if(this._val.REVIEWS.length > 0){
          this.reviewsList = this._val.REVIEWS;
          this.totNoOfPages = Math.ceil(this.reviewsList.length/this.pageSize);
        }
        else{
          this.responseMsg = this._val.responseMsg;
        }
      },1000);
  }

}
