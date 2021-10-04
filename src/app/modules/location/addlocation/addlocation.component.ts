import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { HttpGlobalService } from 'src/app/services/httpglobal.service';
import { ValuesService } from 'src/app/services/values.service';

@Component({
  selector: 'app-addlocation',
  templateUrl: './addlocation.component.html',
  styleUrls: ['./addlocation.component.scss']
})
export class AddlocationComponent implements OnInit {

  public addEditLocationData: any = {
    "locationName": "",
    "locationPincode": "",
    "locationDesc": "",
    "districtId": 2
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
      if(this._val.EDIT_LOCATION_DATA){
        this.addEditLocationData.locationName = this._val.EDIT_LOCATION_DATA.LOCATION_NAME;
        this.addEditLocationData.locationPincode = this._val.EDIT_LOCATION_DATA.LOCATION_PINCODE;
        this.addEditLocationData.locationDesc = this._val.EDIT_LOCATION_DATA.LOCATION_DESC;
        this.addEditLocationData.districtId = this._val.EDIT_LOCATION_DATA.DISTRICT_ID;
      }
    }

    public onAddLocation() {
      if(this.addEditLocationData.locationName && this.addEditLocationData.locationPincode && this.addEditLocationData.locationDesc){
        let url = environment.apiUrl + environment.url.AddLocation;
        let reqAddLocationData = {
            "LOCATION_NAME": this.addEditLocationData.locationName,
            "LOCATION_PINCODE": this.addEditLocationData.locationPincode,
            "LOCATION_DESC": this.addEditLocationData.locationDesc,
            "DISTRICT_ID": this.addEditLocationData.districtId,
            "CREATED_BY": this._val.USER_ID
        }
        
        this._gs.postCall(url, reqAddLocationData)
                .subscribe(
                  res => {
                    console.log(res);
                    if(res.msgCode === "SUCC_MSG_39"){
                      this._router.navigate(['/location']);
                      this._gs.showSuccessToast(res['msg'], "Success");
                    }
                  },
                  err => {
                    console.log(err);
                  }
                )
      }
    }

    public onEditLocation() {
      let url = environment.apiUrl + environment.url.EditLocation + this._val.EDIT_LOCATION_DATA.LOCATION_ID;
      let reqEditLocationData = {
          "LOCATION_NAME": this.addEditLocationData.locationName,
          "LOCATION_PINCODE": this.addEditLocationData.locationPincode,
          "LOCATION_DESC": this.addEditLocationData.locationDesc,
          "DISTRICT_ID": this.addEditLocationData.districtId,
          "UPDATED_BY": this._val.USER_ID
      }
      this._gs.patchCall(url, reqEditLocationData)
              .subscribe(
                res => {
                  console.log(res);
                  if(res.msgCode === "SUCC_MSG_40"){                    
                    this._router.navigate(['/location']);
                    this._val.EDIT_LOCATION_DATA = '';
                    this._val.isAddMode = true;
                    this._gs.showSuccessToast(res['msg'], "Success");
                  }
                },
                err => {
                  console.log(err);
                }
              )
  }

  public onCancelLocation() {
    this._val.onCancel();
    this._router.navigate(['/location']);
  }

}
