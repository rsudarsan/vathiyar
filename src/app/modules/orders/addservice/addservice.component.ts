import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { environment } from '../../../../environments/environment';
import { HttpGlobalService } from 'src/app/services/httpglobal.service';
import { ValuesService } from 'src/app/services/values.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

// class ImageSnippet {
//   pending: boolean = false;
//   status: string = 'init';

//   constructor(public src: string, public file: File) {}
// }

@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  
})
export class AddserviceComponent implements OnInit {

  public addServiceData: any = {
    "categoryType": "",
    "name": "",
    "price": "",
    "desc": "",
    "shortDesc":"",
    "keyInsights": "",
    "promise": "",
    "packageId": "",
    "inclusionId": "",
    "locationId": ""
  };
  public imageUrl: any = "";
  public selectedFile: File = null;

  public categories: any;
  public packages: any;
  public inclusions: any;
  public locations: any;

  public isAddMode: boolean;
  

  constructor(public translate: TranslateService,
              private _gs: HttpGlobalService,
              public formBuilder: FormBuilder,
              private _router: Router,
              private _val: ValuesService,
              private _route: ActivatedRoute,
              private _ws: WorkspaceService) { 
                this.isAddMode = this._val.isAddMode;
                this.categories = this._val.SERVICE_CATEGORIES;
                this.packages = this._val.PACKAGES;
                this.inclusions = this._val.INCLUSIONS;
                this.locations = this._val.LOCATIONS;
                this.addServiceData.categoryType = this.categories[0].SERVICE_CAT_NAME;
                console.log(this.categories[0].SERVICE_CAT_NAME);
                // const id = this._route.snapshot.paramMap.get('id');
                // if(id){
                //   this.isAddMode = true;
                // }
  }


  public ngOnInit(): void {
    if(this._val.EDIT_SERVICE_DATA){
      this.addServiceData.name = this._val.EDIT_SERVICE_DATA.SERVICE_NAME;
      this.addServiceData.price = this._val.EDIT_SERVICE_DATA.SERVICE_PRICE;
      this.addServiceData.desc = this._val.EDIT_SERVICE_DATA.SERVICE_DESC;
      this.addServiceData.shortDesc = this._val.EDIT_SERVICE_DATA.SERVICE_SHORT_DESC;
      this.addServiceData.keyInsights = this._val.EDIT_SERVICE_DATA.SERVICE_KEYINSIGHTS;
      this.addServiceData.promise = this._val.EDIT_SERVICE_DATA.SERVICE_PROMISE;
      this.addServiceData.packageId = this._val.EDIT_SERVICE_DATA.PACKAGE_ID;
      this.addServiceData.inclusionId = this._val.EDIT_SERVICE_DATA.INCLUSIONS_ID;
      this.addServiceData.locationId = this._val.EDIT_SERVICE_DATA.LOCATION_ID;
      this.addServiceData.categoryType = this._val.EDIT_SERVICE_DATA.SERVICE_CAT_ID;
      this.selectedFile = this._val.EDIT_SERVICE_DATA.SERVICE_IMAGE;
      this.imageUrl = environment.imageServerUrl + '/services/' +   this._val.EDIT_SERVICE_DATA.SERVICE_IMAGE_NAME;

    }
  }

  onSelectFile(event){
    console.log(event.target.files);
    if(event.target.files) {
      var reader = new FileReader();
      this.selectedFile = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event:any)=>{
        console.log(event.target);
        this.imageUrl=event.target.result;
        
      }
    }
  }

  public onAddServiceWithImg() {
    // console.log(this.fileInput);
    console.log('inside add service');
    console.log(this.selectedFile);
    // if(this.addServiceData.name && this.addServiceData.price && this.addServiceData.desc && this.addServiceData.categoryType && this.addServiceData.specification){
    if(this.addServiceData.categoryType && this.addServiceData.name && this.addServiceData.price 
      && this.addServiceData.desc && this.addServiceData.shortDesc && this.addServiceData.keyInsights 
      && this.addServiceData.promise && this.addServiceData.packageId && this.addServiceData.inclusionId 
      && this.addServiceData.locationId && this.imageUrl){
      console.log(this.addServiceData);
      let url = environment.apiUrl + environment.url.AddService;
      const formData: FormData = new FormData();
      formData.append('SERVICE_CAT_ID', this.addServiceData.categoryType);
      formData.append('SERVICE_NAME', this.addServiceData.name);
      formData.append('SERVICE_PRICE', this.addServiceData.price);
      formData.append('SERVICE_DESC', this.addServiceData.desc);
      formData.append('SERVICE_SHORT_DESC', this.addServiceData.shortDesc);
      formData.append('SERVICE_KEYINSIGHTS', this.addServiceData.keyInsights);
      formData.append('SERVICE_PROMISE', this.addServiceData.promise);
      formData.append('PACKAGE_ID', this.addServiceData.packageId);
      formData.append('INCLUSIONS_ID', this.addServiceData.inclusionId);
      formData.append('LOCATION_ID', this.addServiceData.locationId);
      formData.append('SERVICE_IMAGE', this.selectedFile);
      formData.append('SERVICE_IMAGE_NAME', this.selectedFile.name);
      formData.append('CREATED_BY', this._val.USER_ID.toString());

      this._gs.postCall(url, formData)
              .subscribe(
                res => {
                  console.log(res);
                  if(res.msgCode === "SUCC_MSG_6"){
                    this._router.navigate(['/orders']);
                    this._gs.showSuccessToast(res['msg'], "Success");
                  } 
                },
                err => {
                  console.log(err);
                  this._gs.showErrorToast(err['error']['msg'], "Error");
                }
              )
    }
  }


  public onEditService(){
    console.log(this._val.EDIT_SERVICE_DATA);
    let url = environment.apiUrl + environment.url.EditService + this._val.EDIT_SERVICE_DATA.SERVICE_ID;
    console.log(url);
    const formData: FormData = new FormData();
      formData.append('SERVICE_CAT_ID', this.addServiceData.categoryType);
      formData.append('SERVICE_NAME', this.addServiceData.name);
      formData.append('SERVICE_PRICE', this.addServiceData.price);
      formData.append('SERVICE_DESC', this.addServiceData.desc);
      formData.append('SERVICE_SHORT_DESC', this.addServiceData.shortDesc);
      formData.append('SERVICE_KEYINSIGHTS', this.addServiceData.keyInsights);
      formData.append('SERVICE_PROMISE', this.addServiceData.promise);
      formData.append('PACKAGE_ID', this.addServiceData.packageId);
      formData.append('INCLUSIONS_ID', this.addServiceData.inclusionId);
      formData.append('LOCATION_ID', this.addServiceData.locationId);
      formData.append('SERVICE_IMAGE', this.selectedFile ? this.selectedFile : '');
      formData.append('SERVICE_IMAGE_NAME', this.selectedFile ? this.selectedFile.name : this._val.EDIT_SERVICE_DATA.SERVICE_IMAGE_NAME);
      formData.append('CREATED_BY', this._val.USER_ID.toString());

      // Http call for login
      this._gs.patchCall(url, formData)
              .subscribe(
                res => {
                  if(res.msgCode === "SUCC_MSG_8"){
                    this._router.navigate(['/orders']);
                    this._val.EDIT_SERVICE_DATA = '';
                    this._val.isAddMode = true;
                    this._gs.showSuccessToast(res['msg'], "Success");
                  }
                },
                err => {
                  console.log(err);
                  this._gs.showErrorToast(err['error']['msg'], "Error");
                }
              )
  }

  public onCancelService(){
    this._val.onCancel();
    this._router.navigate(['/orders']);
  }
}