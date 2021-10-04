import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { HttpGlobalService } from 'src/app/services/httpglobal.service';
import { ValuesService } from 'src/app/services/values.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
  
})
export class AddUserComponent implements OnInit {

  public addUserData: any = {
    "fname": "",
    "lname": "",
    "email": "",
    "contactNo": "",
    "userType": "Admin"
  };
  public isAddMode: boolean;

  constructor(public translate: TranslateService,
              private _gs: HttpGlobalService,
              public formBuilder: FormBuilder,
              private _router: Router,
              public val: ValuesService) {
                this.isAddMode = this.val.isAddMode;
  }

  public ngOnInit(): void {
    if(this.val.EDIT_USER_DATA){
      this.addUserData.fname = this.val.EDIT_USER_DATA.FIRST_NAME;
      this.addUserData.lname = this.val.EDIT_USER_DATA.LAST_NAME;
      this.addUserData.email = this.val.EDIT_USER_DATA.EMAIL_ID;
      this.addUserData.contactNo = this.val.EDIT_USER_DATA.CONTACT_NO;
      this.addUserData.userType = this.val.EDIT_USER_DATA.USER_TYPE;
    }
  }

  onAddUser() {
    if(this.addUserData.fname && this.addUserData.lname && this.addUserData.email && this.addUserData.contactNo && this.addUserData.userType){
      let url = environment.apiUrl + environment.url.CreateUser;
      let reqAddUserdata = {
          "EMAIL_ID": this.addUserData.email,
          "USER_TYPE": this.addUserData.userType,
          "FIRST_NAME": this.addUserData.fname,
          "LAST_NAME": this.addUserData.lname,
          "CONTACT_NO": this.addUserData.contactNo,
          "CREATED_BY": this.val.USER_ID
      }
      // Http call for login
      this._gs.postCall(url, reqAddUserdata)
              .subscribe(
                res => {
                  console.log(res);
                  if(res.msgCode === "SUCC_MSG_3"){
                    this._router.navigate(['/users']);
                    this._gs.showSuccessToast(res['msg'], "Success");
                  }
                },
                err => {
                  console.log(err);
                }
              )
    }
  }

  onEditUser(){
    let url = environment.apiUrl + environment.url.EditUser + this.val.EDIT_USER_DATA.USER_ID;
      let reqEditUserdata = {
          "EMAIL_ID": this.addUserData.email,
          "USER_TYPE": this.addUserData.userType,
          "FIRST_NAME": this.addUserData.fname,
          "LAST_NAME": this.addUserData.lname,
          "CONTACT_NO": this.addUserData.contactNo,
          "UPDATED_BY": this.val.USER_ID
      }
      // Http call for login
      this._gs.patchCall(url, reqEditUserdata)
              .subscribe(
                res => {
                  if(res.msgCode === "SUCC_MSG_5"){
                    this._router.navigate(['/users']);
                    this.val.EDIT_USER_DATA = '';
                    this.val.isAddMode = true;
                    this._gs.showSuccessToast(res['msg'], "Success");
                  }
                },
                err => {
                  console.log(err);
                }
              )
  }

  public onCancelUser() {
    this.val.onCancel();
    this._router.navigate(['/users']);
  }

}
