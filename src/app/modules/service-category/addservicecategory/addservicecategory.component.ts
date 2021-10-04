import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { HttpGlobalService } from 'src/app/services/httpglobal.service';
import { ValuesService } from 'src/app/services/values.service';

@Component({
  selector: 'app-addservicecategory',
  templateUrl: './addservicecategory.component.html',
  styleUrls: ['./addservicecategory.component.scss']
})
export class AddservicecategoryComponent implements OnInit {

  public addEditServiceCategoryData: any = {
    "serviceCatName": "",
    "desc": ""
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
    if(this._val.EDIT_SERVICE_CATEGORY_DATA){
      this.addEditServiceCategoryData.serviceCatName = this._val.EDIT_SERVICE_CATEGORY_DATA.SERVICE_CAT_NAME;
      this.addEditServiceCategoryData.desc = this._val.EDIT_SERVICE_CATEGORY_DATA.SERVICE_CAT_DESC;
    }
  }

  onAddServiceCategory() {
    if(this.addEditServiceCategoryData.serviceCatName && this.addEditServiceCategoryData.desc){
      let url = environment.apiUrl + environment.url.AddServiceCategory;
      let reqAddServiceCatData = {
          "SERVICE_CAT_NAME": this.addEditServiceCategoryData.serviceCatName,
          "SERVICE_CAT_DESC": this.addEditServiceCategoryData.desc,
          "CREATED_BY": this._val.USER_ID
      }
      
      this._gs.postCall(url, reqAddServiceCatData)
              .subscribe(
                res => {
                  console.log(res);
                  if(res.msgCode === "SUCC_MSG_24"){
                    this._router.navigate(['/service-category']);
                    this._gs.showSuccessToast(res['msg'], "Success");
                  }
                },
                err => {
                  console.log(err);
                }
              )
    }
  }

  onEditServiceCategory() {
      let url = environment.apiUrl + environment.url.EditServiceCategory + this._val.EDIT_SERVICE_CATEGORY_DATA.SERVICE_CAT_ID;
      let reqEditServiceCatData = {
          "SERVICE_CAT_NAME": this.addEditServiceCategoryData.serviceCatName,
          "SERVICE_CAT_DESC": this.addEditServiceCategoryData.desc,
          "UPDATED_BY": this._val.USER_ID
      }
      this._gs.patchCall(url, reqEditServiceCatData)
              .subscribe(
                res => {
                  console.log(res);
                  if(res.msgCode === "SUCC_MSG_25"){
                    this._router.navigate(['/service-category']);
                    this._val.EDIT_SERVICE_CATEGORY_DATA = '';
                    this._val.isAddMode = true;
                    this._gs.showSuccessToast(res['msg'], "Success");
                  }
                },
                err => {
                  console.log(err);
                }
              )
  }

}
