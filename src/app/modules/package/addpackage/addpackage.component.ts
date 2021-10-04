import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { HttpGlobalService } from 'src/app/services/httpglobal.service';
import { ValuesService } from 'src/app/services/values.service';

@Component({
  selector: 'app-addpackage',
  templateUrl: './addpackage.component.html',
  styleUrls: ['./addpackage.component.scss']
})
export class AddpackageComponent implements OnInit {

  public addEditPackageData: any = {
    "packageName": "",
    "packagePrice": "",
    "packageDesc": ""
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
      if(this._val.EDIT_PACKAGE_DATA){
        this.addEditPackageData.packageName = this._val.EDIT_PACKAGE_DATA.PACKAGE_NAME;
        this.addEditPackageData.packagePrice = this._val.EDIT_PACKAGE_DATA.PACKAGE_PRICE;
        this.addEditPackageData.packageDesc = this._val.EDIT_PACKAGE_DATA.PACKAGE_DESC;
      }
    }

    public onAddPackage() {
      if(this.addEditPackageData.packageName && this.addEditPackageData.packagePrice && this.addEditPackageData.packageDesc){
        let url = environment.apiUrl + environment.url.AddPackage;
        let reqAddPackageData = {
            "PACKAGE_NAME": this.addEditPackageData.packageName,
            "PACKAGE_PRICE": this.addEditPackageData.packagePrice,
            "PACKAGE_DESC": this.addEditPackageData.packageDesc,
            "CREATED_BY": this._val.USER_ID
        }
        
        this._gs.postCall(url, reqAddPackageData)
                .subscribe(
                  res => {
                    console.log(res);
                    if(res.msgCode === "SUCC_MSG_27"){
                      this._router.navigate(['/package']);
                      this._gs.showSuccessToast(res['msg'], "Success");
                    }
                  },
                  err => {
                    console.log(err);
                  }
                )
      }
    }

    public onEditPackage() {
      let url = environment.apiUrl + environment.url.EditPackage + this._val.EDIT_PACKAGE_DATA.PACKAGE_ID;
      let reqEditPackageData = {
          "PACKAGE_NAME": this.addEditPackageData.packageName,
          "PACKAGE_PRICE": this.addEditPackageData.packagePrice,
          "PACKAGE_DESC": this.addEditPackageData.packageDesc,
          "UPDATED_BY": this._val.USER_ID
      }
      this._gs.patchCall(url, reqEditPackageData)
              .subscribe(
                res => {
                  console.log(res);
                  if(res.msgCode === "SUCC_MSG_28"){                    
                    this._router.navigate(['/package']);
                    this._val.EDIT_PACKAGE_DATA = '';
                    this._val.isAddMode = true;
                    this._gs.showSuccessToast(res['msg'], "Success");
                  }
                },
                err => {
                  console.log(err);
                }
              )
  }

  public onCancelPackage(){
    this._val.onCancel();
    this._router.navigate(['/package']);
  }

}
