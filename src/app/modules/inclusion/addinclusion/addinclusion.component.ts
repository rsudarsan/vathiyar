import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { HttpGlobalService } from 'src/app/services/httpglobal.service';
import { ValuesService } from 'src/app/services/values.service';

@Component({
  selector: 'app-addinclusion',
  templateUrl: './addinclusion.component.html',
  styleUrls: ['./addinclusion.component.scss']
})
export class AddinclusionComponent implements OnInit {

  public addEditInclusionData: any = {
    "inclusionName": "",
    "inclusionPrice": "",
    "inclusionDesc": ""
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
      if(this._val.EDIT_INCLUSION_DATA){
        this.addEditInclusionData.inclusionName = this._val.EDIT_INCLUSION_DATA.INCLUSIONS_NAME;
        this.addEditInclusionData.inclusionPrice = this._val.EDIT_INCLUSION_DATA.INCLUSIONS_PRICE;
        this.addEditInclusionData.inclusionDesc = this._val.EDIT_INCLUSION_DATA.INCLUSIONS_DESC;
      }
    }

    public onAddInclusion() {
      if(this.addEditInclusionData.inclusionName && this.addEditInclusionData.inclusionPrice && this.addEditInclusionData.inclusionDesc){
        let url = environment.apiUrl + environment.url.AddInclusion;
        let reqAddInclusionData = {
            "INCLUSIONS_NAME": this.addEditInclusionData.inclusionName,
            "INCLUSIONS_PRICE": this.addEditInclusionData.inclusionPrice,
            "INCLUSIONS_DESC": this.addEditInclusionData.inclusionDesc,
            "CREATED_BY": this._val.USER_ID
        }
        
        this._gs.postCall(url, reqAddInclusionData)
                .subscribe(
                  res => {
                    console.log(res);
                    if(res.msgCode === "SUCC_MSG_30"){
                      this._router.navigate(['/inclusion']);
                      this._gs.showSuccessToast(res['msg'], "Success");
                    }
                  },
                  err => {
                    console.log(err);
                  }
                )
      }
    }

    public onEditInclusion() {
      let url = environment.apiUrl + environment.url.EditInclusion + this._val.EDIT_INCLUSION_DATA.INCLUSIONS_ID;
      let reqEditInclusionData = {
          "INCLUSIONS_NAME": this.addEditInclusionData.inclusionName,
          "INCLUSIONS_PRICE": this.addEditInclusionData.inclusionPrice,
          "INCLUSIONS_DESC": this.addEditInclusionData.inclusionDesc,
          "UPDATED_BY": this._val.USER_ID
      }
      this._gs.patchCall(url, reqEditInclusionData)
              .subscribe(
                res => {
                  console.log(res);
                  if(res.msgCode === "SUCC_MSG_31"){                    
                    this._router.navigate(['/inclusion']);
                    this._val.EDIT_INCLUSION_DATA = '';
                    this._val.isAddMode = true;
                    this._gs.showSuccessToast(res['msg'], "Success");
                  }
                },
                err => {
                  console.log(err);
                }
              )
  }

  public onCancelInclusion() {
      this._val.onCancel();
      this._router.navigate(['/inclusion']);
  }

}
