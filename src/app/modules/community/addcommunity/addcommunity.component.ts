import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { HttpGlobalService } from 'src/app/services/httpglobal.service';
import { ValuesService } from 'src/app/services/values.service';
@Component({
  selector: 'app-addcommunity',
  templateUrl: './addcommunity.component.html',
  styleUrls: ['./addcommunity.component.scss']
})
export class AddcommunityComponent implements OnInit {

  public addEditCommunityData: any = {
    "communityName": "",
    "communityCode": "",
    "communityDesc": ""
  };
  public isAddMode: boolean;

  constructor(public translate: TranslateService,
    private _gs: HttpGlobalService,
    public formBuilder: FormBuilder,
    private _router: Router,
    private _val: ValuesService) { 
      this.isAddMode = this._val.isAddMode;
    }

    public ngOnInit(): void {
      if(this._val.EDIT_COMMUNITY_DATA){
        this.addEditCommunityData.communityName = this._val.EDIT_COMMUNITY_DATA.COMMUNITY_NAME;
        this.addEditCommunityData.communityCode = this._val.EDIT_COMMUNITY_DATA.COMMUNITY_CD;
        this.addEditCommunityData.communityDesc = this._val.EDIT_COMMUNITY_DATA.COMMUNITY_DESC;
      }
    }

    public onAddCommunity() {
      if(this.addEditCommunityData.communityName && this.addEditCommunityData.communityCode && this.addEditCommunityData.communityDesc){
        let url = environment.apiUrl + environment.url.AddCommunity;
        let reqAddCommunityData = {
            "COMMUNITY_NAME": this.addEditCommunityData.communityName,
            "COMMUNITY_CD": this.addEditCommunityData.communityCode,
            "COMMUNITY_DESC": this.addEditCommunityData.communityDesc,
            "CREATED_BY": this._val.USER_ID
        }
        
        this._gs.postCall(url, reqAddCommunityData)
                .subscribe(
                  res => {
                    console.log(res);
                    if(res.msgCode === "SUCC_MSG_33"){
                      this._router.navigate(['/community']);
                      this._gs.showSuccessToast(res['msg'], "Success");
                    }
                  },
                  err => {
                    console.log(err);
                  }
                )
      }
    }

    public onEditCommunity() {
      let url = environment.apiUrl + environment.url.EditCommunity + this._val.EDIT_COMMUNITY_DATA.COMMUNITY_ID;
      let reqEditCommunityData = {
          "COMMUNITY_NAME": this.addEditCommunityData.communityName,
          "COMMUNITY_CD": this.addEditCommunityData.communityCode,
          "COMMUNITY_DESC": this.addEditCommunityData.communityDesc,
          "UPDATED_BY": this._val.USER_ID
      }
      this._gs.patchCall(url, reqEditCommunityData)
              .subscribe(
                res => {
                  console.log(res);
                  if(res.msgCode === "SUCC_MSG_34"){                    
                    this._router.navigate(['/community']);
                    this._val.EDIT_COMMUNITY_DATA = '';
                    this._val.isAddMode = true;
                    this._gs.showSuccessToast(res['msg'], "Success");
                  }
                },
                err => {
                  console.log(err);
                }
              )
    }

    public onCancelCommunity() {
      this._val.onCancel();
      this._router.navigate(['/community']);
    }

}
