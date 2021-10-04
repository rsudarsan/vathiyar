import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { loginUserData } from '../../../shared/utilities/variables';
import { environment } from './../../../../environments/environment';
import { HttpGlobalService } from 'src/app/services/httpglobal.service';
import { ValuesService } from '../../../services/values.service';

import { WorkspaceService } from 'src/app/services/workspace.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  
})
export class LoginComponent implements OnInit {

  public loginUserData: any = {
    "email": "",
    "password": ""
  };
  public msg: string;

  constructor(public translate: TranslateService,
              private _gs: HttpGlobalService,
              public formBuilder: FormBuilder,
              private _router: Router,
              private _val: ValuesService,
              private _activatedRoute: ActivatedRoute,
              private _ws: WorkspaceService) { 
    // translate.addLangs(['en', 'ta']);
    // translate.setDefaultLang('en');
  }

  ngOnInit(): void {
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  onSubmitLogin(){   
    // validate whether login details are entered
    if(this.loginUserData.email && this.loginUserData.password){
      let url = environment.apiUrl + environment.url.Login;
      let reqUserdata = {
        "EMAIL_ID": this.loginUserData.email,
        "PASSWORD": this.loginUserData.password
      }
      // Http call for login
      this._gs.postCall(url, reqUserdata)
              .subscribe(
                res => {
                  console.log(res);
                  if(res.msgCode === "SUCC_MSG_1"){
                    localStorage.setItem('token', res.token);
                    this._val.USER_ID = res.userData['USER_ID'];
                    this._val.USER_TYPE = res.userData['USER_TYPE'];
                     //Get call for loading all the service categories
                    this._ws.getAllServiceCategories();
                    //Get call for loading all the languages
                    this._ws.getAllLanguages();
                    //Get call for loading all the locations
                    this._ws.getAllLocations(2);
                    //Get call for loading all the packages
                    this._ws.getAllPackages();
                    //Get call for loading all the communities
                    this._ws.getAllCommunities();
                    //Get call for loading all the inclusions
                    this._ws.getAllInclusions();
                    // Get call for loading all the services
                    this._ws.getAllServices();
                    // Get call for loading all the states
                    this._ws.getAllStates();
                    // Get call for loading all the account types
                    this._ws.getAllAccountTypes();
                    this._router.navigate(['/users']);
                  }
                },
                err => {                  
                  console.log(err);
                  if(err.msgCode === "ERR_MSG_1"){
                    this.msg = err.msg;
                  }
                }
              )
    }
    // Display the validation message to enter the details 
    else {
      console.log("Enter the details");
    }
    
  }
  
}
