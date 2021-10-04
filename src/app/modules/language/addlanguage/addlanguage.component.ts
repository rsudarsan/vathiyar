import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { HttpGlobalService } from 'src/app/services/httpglobal.service';
import { ValuesService } from 'src/app/services/values.service';
@Component({
  selector: 'app-addlanguage',
  templateUrl: './addlanguage.component.html',
  styleUrls: ['./addlanguage.component.scss']
})
export class AddlanguageComponent implements OnInit {
  public addEditLanguageData: any = {
    "languageName": "",
    "languageCode": "",
    "languageDesc": ""
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
      if(this._val.EDIT_LANGUAGE_DATA){
        this.addEditLanguageData.languageName = this._val.EDIT_LANGUAGE_DATA.LANGUAGE_NAME;
        this.addEditLanguageData.languageCode = this._val.EDIT_LANGUAGE_DATA.LANGUAGE_CD;
        this.addEditLanguageData.languageDesc = this._val.EDIT_LANGUAGE_DATA.LANGUAGE_DESC;
      }
    }

    public onAddLanguage() {
      if(this.addEditLanguageData.languageName && this.addEditLanguageData.languageCode && this.addEditLanguageData.languageDesc){
        let url = environment.apiUrl + environment.url.AddLanguage;
        let reqAddLanguageData = {
            "LANGUAGE_NAME": this.addEditLanguageData.languageName,
            "LANGUAGE_CD": this.addEditLanguageData.languageCode,
            "LANGUAGE_DESC": this.addEditLanguageData.languageDesc,
            "CREATED_BY": this._val.USER_ID
        }
        
        this._gs.postCall(url, reqAddLanguageData)
                .subscribe(
                  res => {
                    console.log(res);
                    if(res.msgCode === "SUCC_MSG_36"){
                      this._router.navigate(['/language']);
                      this._gs.showSuccessToast(res['msg'], "Success");
                    }
                  },
                  err => {
                    console.log(err);
                  }
                )
      }
    }

    public onEditLanguage() {
      let url = environment.apiUrl + environment.url.EditLanguage + this._val.EDIT_LANGUAGE_DATA.LANGUAGE_ID;
      let reqEditLanguageData = {
          "LANGUAGE_NAME": this.addEditLanguageData.languageName,
          "LANGUAGE_CD": this.addEditLanguageData.languageCode,
          "LANGUAGE_DESC": this.addEditLanguageData.languageDesc,
          "UPDATED_BY": this._val.USER_ID
      }
      this._gs.patchCall(url, reqEditLanguageData)
              .subscribe(
                res => {
                  console.log(res);
                  if(res.msgCode === "SUCC_MSG_37"){                    
                    this._router.navigate(['/language']);
                    this._val.EDIT_LANGUAGE_DATA = '';
                    this._val.isAddMode = true;
                    this._gs.showSuccessToast(res['msg'], "Success");
                  }
                },
                err => {
                  console.log(err);
                }
              )
  }

  public onCancelLanguage(){
    this._val.onCancel();
    this._router.navigate(['/language']);
  }

}
