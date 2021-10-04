import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
// import _, { map } from 'underscore';
import { HttpGlobalService } from 'src/app/services/httpglobal.service';
import { ValuesService } from 'src/app/services/values.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-addvathiyar',
  templateUrl: './addvathiyar.component.html',
})
export class AddvathiyarComponent implements OnInit {

  public addVathiyarData: any = {
    "fname": "",
    "lname": "",
    "email": "",
    "aadharNumber": "",
    // "profilePic": "",
    // "aadharImage": "",
    "address": "",
    "country": "",
    "state": "",
    "district": "",
    "pincode": "",
    "phoneNo": "",
    // "description": "",
    "bankName": "",
    "bankAccNo": "",
    "bankIFSCCode": "",
    "UPIID": "",
    "bankAccType": "",
    "UPIName": ""
  };
  public isAddMode: boolean;
  public profileImageUrl: any = "";
  public selectedProfileImgFile: File = null;
  public aadharImageUrl: any = "";
  public selectedAadharImgFile: File = null;
  public imgsArr: any = [];
  public statesList: any;
  public districtsList: any;
  public communitiesList: any;
  public accountTypesList: any;
  // Services multiselect drop down variables
  public serviceDropDownList: any = [];
  public serviceSelectedItems: any = [];
  // public serviceDropDownSettings: IDropdownSettings = {};

  // Language multiselect drop down variables
  public langDropDownList: any = [];
  public langSelectedItems: any = [];
  // public langDropDownSettings: IDropdownSettings = {};

  // Location multiselect drop down variables
  public locationDropDownList: any = [];
  public locationSelectedItems: any = [];
  // public locationDropDownSettings: IDropdownSettings = {};

  // Community multiselect drop down variables
  public communityDropDownList: any = [];
  public communitySelectedItems: any = [];
  // public communityDropDownSettings: IDropdownSettings = {};

  constructor(private _gs: HttpGlobalService, 
              private _router: Router,
              private _val: ValuesService,
              private _ws:WorkspaceService,
              public formBuilder: FormBuilder) {
                this.isAddMode = this._val.isAddMode;
  }

  ngOnInit(): void {
      // this._ws.getAllStates();
      // this._ws.getAllServices();
      // this._ws.getAllLanguages();
      // this._ws.getAllCommunities();
      // this._ws.getAllAccountTypes();
      this.serviceDropDownList = this._val.SERVICES; 
      if(this._val.EDIT_VATHIYAR_DATA){
        this.addVathiyarData.fname = this._val.EDIT_VATHIYAR_DATA.FIRST_NAME;
        this.addVathiyarData.lname = this._val.EDIT_VATHIYAR_DATA.LAST_NAME;
        this.addVathiyarData.email = this._val.EDIT_VATHIYAR_DATA.EMAIL_ID;
        this.addVathiyarData.aadharNumber = this._val.EDIT_VATHIYAR_DATA.AADHAAR_NUMBER;
        this.addVathiyarData.address = this._val.EDIT_VATHIYAR_DATA.LOCATION_ADDRESS;
        this.addVathiyarData.country = this._val.EDIT_VATHIYAR_DATA.LOCATION_ADDRESS_COUNTRY;
        this.addVathiyarData.state = this._val.EDIT_VATHIYAR_DATA.LOCATION_ADDRESS_STATE;
        this.addVathiyarData.district = this._val.EDIT_VATHIYAR_DATA.LOCATION_ADDRESS_CITY;
        this.addVathiyarData.pincode = this._val.EDIT_VATHIYAR_DATA.LOCATION_ADDRESS_PINCODE;
        this.addVathiyarData.phoneNo = this._val.EDIT_VATHIYAR_DATA.CONTACT_NO;
        // this.addVathiyarData.description = this._val.EDIT_VATHIYAR_DATA.DESCRIPTION;
        this.addVathiyarData.bankName = this._val.EDIT_VATHIYAR_DATA.NAME_OF_BANK;
        this.addVathiyarData.bankAccNo = this._val.EDIT_VATHIYAR_DATA.BANK_ACC_NO;
        this.addVathiyarData.bankIFSCCode = this._val.EDIT_VATHIYAR_DATA.BANK_IFSC_CODE;
        this.addVathiyarData.UPIID = this._val.EDIT_VATHIYAR_DATA.UPI_ID;
        this.addVathiyarData.UPIName = this._val.EDIT_VATHIYAR_DATA.UPI_NAME;
        this.addVathiyarData.bankAccType = this._val.EDIT_VATHIYAR_DATA.BANK_ACC_TYPE_ID;
        // this.langSelectedItems.push(this._val.EDIT_VATHIYAR_DATA.LANGUAGE_ID[0]);

        this.serviceSelectedItems = this._val.EDIT_VATHIYAR_DATA.SERVICES;
        // for(let i=1; i < this._val.EDIT_VATHIYAR_DATA.SERVICES.length; i++){
        //   this.onItemSelect(this._val.EDIT_VATHIYAR_DATA.SERVICES[i], 'services');
        // }
        for(let j=1; j < this._val.EDIT_VATHIYAR_DATA.LANGUAGE_ID.length; j++){
          this.langSelectedItems.push(this._val.EDIT_VATHIYAR_DATA.LANGUAGE_ID[j]);
          // this.onItemSelect(this._val.EDIT_VATHIYAR_DATA.LANGUAGE_ID[j], 'services');
        }
        // for(let k=1; k < this._val.EDIT_VATHIYAR_DATA.LOCATION_PREFERENCE.length; k++){
        //   this.onItemSelect(this._val.EDIT_VATHIYAR_DATA.LOCATION_PREFERENCE[k], 'services');
        // }
        // this.langSelectedItems = this._val.EDIT_VATHIYAR_DATA.LANGUAGE_ID;
        this.locationSelectedItems = this._val.EDIT_VATHIYAR_DATA.LOCATION_PREFERENCE;
        this.communitySelectedItems = this._val.EDIT_VATHIYAR_DATA.COMMUNITY_ID;
        this.profileImageUrl = environment.imageServerUrl + '/profileImgs/' +   this._val.EDIT_VATHIYAR_DATA.PROFILE_IMAGE_NAME;
        this.aadharImageUrl = environment.imageServerUrl + '/aadharImgs/' +   this._val.EDIT_VATHIYAR_DATA.AADHAAR_CARD_IMAGE_NAME;
      }
  }

  ngAfterViewInit(){
    console.log(this.serviceSelectedItems);
    console.log(this.locationSelectedItems);
    console.log(this.langSelectedItems);
      setTimeout(()=>{ 
          if(this._val.SERVICES.length > 0){
          this.serviceDropDownList = this._val.SERVICES;     
          // this.serviceDropDownSettings = {
          //           singleSelection: false,
          //           idField: 'SERVICE_ID',
          //           textField: 'SERVICE_NAME',
          //           selectAllText: 'Select All',
          //           unSelectAllText: 'UnSelect All',
          //           itemsShowLimit: 3,
          //           allowSearchFilter: true
          //   };  
        }

        if(this._val.LANGUAGES.length > 0){
          this.langDropDownList = this._val.LANGUAGES;     
          // this.langDropDownSettings = {
          //           singleSelection: false,
          //           idField: 'LANGUAGE_ID',
          //           textField: 'LANGUAGE_NAME',
          //           selectAllText: 'Select All',
          //           unSelectAllText: 'UnSelect All',
          //           itemsShowLimit: 3,
          //           allowSearchFilter: true
          //   };  
        }

        if(this._val.COMMUNITIES.length > 0){
          this.communityDropDownList = this._val.COMMUNITIES;     
          // this.communityDropDownSettings = {
          //           singleSelection: false,
          //           idField: 'COMMUNITY_ID',
          //           textField: 'COMMUNITY_NAME',
          //           selectAllText: 'Select All',
          //           unSelectAllText: 'UnSelect All',
          //           itemsShowLimit: 3,
          //           allowSearchFilter: true
          //   };  
        }

        if(this._val.STATES && this._val.STATES.length > 0){
          this.statesList = this._val.STATES;
        }

        if(this._val.ACCOUNT_TYPES && this._val.ACCOUNT_TYPES.length > 0){
          this.accountTypesList = this._val.ACCOUNT_TYPES;
        }

      }, 2000);
      
  }
  onSelectAllClick(items, selectedItem) {
    selectedItem = items.map(item => item.id); 
}

  onItemSelect(item: any, whichSelect: any) {
    console.log(this.serviceSelectedItems);
    console.log(this.locationSelectedItems);
    console.log(this.langSelectedItems);
    // if(!this.isAddMode){
    //   if(whichSelect === 'Services'){
    //     this.serviceSelectedItems.push(item); 
    //     console.log(this.serviceSelectedItems);    
    //   } else if(whichSelect === 'Languages'){
    //     this.langSelectedItems.push(item);
    //     console.log(this.langSelectedItems);
    //   } else if(whichSelect === 'Locations'){
    //     this.locationSelectedItems.push(item);
    //     console.log(this.locationSelectedItems);
    //   }
    // }
    
  }
  // onSelectAll(items: any, whichSelect: any) {
  //   if(whichSelect === 'Services'){
  //     this.serviceSelectedItems.push(items);     
  //   } else if(whichSelect === 'Languages'){
  //     this.langSelectedItems.push(items);
  //   } else if(whichSelect === 'Locations'){
  //     this.locationSelectedItems.push(items);
  //   } else if(whichSelect === 'Community'){
  //     this.communitySelectedItems.push(items);
  //   }
  // }

  // onItemDeSelect(item: any, whichSelect: any){
  //   if(whichSelect === 'Services'){    
  //     this.removeByAttr(this.serviceSelectedItems, 'SERVICE_ID', item.SERVICE_ID); 
  //   } else if(whichSelect === 'Languages'){
  //     this.removeByAttr(this.langSelectedItems, 'LANGUAGE_ID', item.LANGUAGE_ID);
  //   } else if(whichSelect === 'Locations'){
  //     this.removeByAttr(this.locationSelectedItems, 'LOCATION_ID', item.LOCATION_ID);
  //   } else if(whichSelect === 'Community'){
  //     this.removeByAttr(this.communitySelectedItems, 'COMMUNITY_ID', item.COMMUNITY_ID);
  //   }
  // }

  onStateChange(stateId: any, event?: any){

    this._ws.getAllDistricts(stateId);
    setTimeout(()=>{ this.districtsList = this._val.DISTRICTS
    }, 200);

    // let selectedState = $filter('filter')(this._val.STATES, {'STATE_ID': stateId}) 
    // this.addVathiyarData.state = args.target.value; 
    // this.countryName = args.target.options[args.target.selectedIndex].text; 
  }

  onDistrictChange(districtId: any, event?: any){
    this._ws.getAllLocations(districtId);
    setTimeout(()=>{ 
      if(this._val.LOCATIONS.length > 0){
        this.locationDropDownList = this._val.LOCATIONS;     
        // this.locationDropDownSettings = {
        //           singleSelection: false,
        //           idField: 'LOCATION_ID',
        //           textField: 'LOCATION_NAME',
        //           selectAllText: 'Select All',
        //           unSelectAllText: 'UnSelect All',
        //           itemsShowLimit: 3,
        //           allowSearchFilter: true
        //   };  
      }
    }, 200);
  }

  // removeByAttr(arr, attr, value){
  //   var i = arr.length;
  //   while(i--){
  //      if( arr[i] 
  //          && arr[i].hasOwnProperty(attr) 
  //          && (arguments.length > 2 && arr[i][attr] === value ) ){ 
  //          arr.splice(i,1);
  //      }
  //   }
  //   console.log(arr);
  //   return arr;
  // }

  onSelectFile(event,whichImg){
    console.log(event.target.files);
    if(event.target.files) {
      var reader = new FileReader();
      if(whichImg === 'profileImg'){
        this.selectedProfileImgFile = event.target.files[0];
        console.log(this.selectedProfileImgFile);
        reader.readAsDataURL(event.target.files[0]);
        reader.onload=(event:any)=>{
          console.log(event.target);
          this.profileImageUrl=event.target.result;          
        }
      }
      if(whichImg === 'aadharImg'){
        this.selectedAadharImgFile = event.target.files[0];
        console.log(this.selectedAadharImgFile);
        reader.readAsDataURL(event.target.files[0]);
        reader.onload=(event:any)=>{
          console.log(event.target);
          this.aadharImageUrl=event.target.result;          
        }
      }
      
    }
  }

  onUploadProfileImg(){
    let url = environment.apiUrl + environment.url.UploadProfileImg;
    const formData: FormData = new FormData();
    formData.append('PROFILE_IMAGE', this.selectedProfileImgFile);
    // Http call for add vathiyar
    this._gs.postCall(url, formData)
    .subscribe(
      res => {
        console.log(res);
        if(res.msgCode === "SUCC_MSG_44"){
          this.onUploadAadharImg();
        } 
      },
      err => {
        console.log(err);
      }
    )
  }

  onUploadAadharImg(){
    let url = environment.apiUrl + environment.url.UploadAadharImg;
    const formData: FormData = new FormData();
    formData.append('AADHAAR_CARD_IMAGE', this.selectedAadharImgFile);

    // Http call for add vathiyar
    this._gs.postCall(url, formData)
    .subscribe(
      res => {
        console.log(res);
        if(res.msgCode === "SUCC_MSG_44"){
          this.onAddVathiyar();
        } 
      },
      err => {
        console.log(err);
      }
    )
  }

  onAddVathiyar(){
    console.log('inside add vathiyar');
    if(this.addVathiyarData.fname && this.addVathiyarData.lname && 
      this.addVathiyarData.email && this.addVathiyarData.aadharNumber &&
      this.addVathiyarData.address && this.addVathiyarData.country && 
      this.addVathiyarData.state && this.addVathiyarData.district && 
      this.addVathiyarData.pincode && this.addVathiyarData.phoneNo && this.addVathiyarData.bankName &&
      this.addVathiyarData.bankAccNo && this.addVathiyarData.bankIFSCCode &&
      this.addVathiyarData.UPIID && this.addVathiyarData.bankAccType && this.addVathiyarData.UPIName && 
      this.serviceSelectedItems && this.langSelectedItems && this.locationSelectedItems && this.communitySelectedItems ){
      console.log(this.addVathiyarData);
      let url = environment.apiUrl + environment.url.AddVathiyar;
      // const formData: FormData = new FormData();
      // formData.append('USER_TYPE', "Vathiyar");
      // formData.append('FIRST_NAME', this.addVathiyarData.fname);
      // formData.append('LAST_NAME', this.addVathiyarData.lname);
      // formData.append('EMAIL_ID', this.addVathiyarData.email);
      // formData.append('PROFILE_IMAGE', this.selectedProfileImgFile);
      // formData.append('PROFILE_IMAGE_NAME', this.selectedProfileImgFile.name);
      // formData.append('AADHAAR_NUMBER', this.addVathiyarData.aadharNumber);
      // formData.append('AADHAAR_CARD_IMAGE', this.selectedAadharImgFile);
      // formData.append('AADHAAR_CARD_IMAGE_NAME', this.selectedAadharImgFile.name);
      // formData.append('LOCATION_ADDRESS', this.addVathiyarData.address);
      // formData.append('LOCATION_ADDRESS_COUNTRY', this.addVathiyarData.country);
      // formData.append('LOCATION_ADDRESS_STATE', this.addVathiyarData.state);
      // formData.append('LOCATION_ADDRESS_CITY', this.addVathiyarData.district);
      // formData.append('LOCATION_ADDRESS_PINCODE', this.addVathiyarData.pincode);
      // formData.append('CONTACT_NO', this.addVathiyarData.phoneNo);
      // formData.append('SERVICES', this.serviceSelectedItems);
      // formData.append('LANGUAGE_ID', this.langSelectedItems);
      // formData.append('LOCATION_PREFERENCE', this.locationSelectedItems);
      // formData.append('COMMUNITY_ID', this.communitySelectedItems);
      // formData.append('NAME_OF_BANK', this.addVathiyarData.bankName);
      // formData.append('BANK_ACC_NO', this.addVathiyarData.bankAccNo);
      // formData.append('BANK_IFSC_CODE', this.addVathiyarData.bankIFSCCode);
      // formData.append('UPI_ID', this.addVathiyarData.UPIID);
      // formData.append('BANK_ACC_TYPE_ID', this.addVathiyarData.bankAccType);
      // formData.append('UPI_NAME', this.addVathiyarData.UPIName);
      // formData.append('CREATED_BY', this._val.USER_ID.toString());



      let reqAddVathiyardata = {
          
          "USER_TYPE": "Vathiyar",
          "FIRST_NAME": this.addVathiyarData.fname,
          "LAST_NAME": this.addVathiyarData.lname,
          "EMAIL_ID": this.addVathiyarData.email,
          "AADHAAR_NUMBER": this.addVathiyarData.aadharNumber,
          "PROFILE_IMAGE_NAME": this.selectedProfileImgFile.name,
          "AADHAAR_CARD_IMAGE_NAME": this.selectedAadharImgFile.name,
          "LOCATION_ADDRESS": this.addVathiyarData.address,
          "LOCATION_ADDRESS_COUNTRY": this.addVathiyarData.country,
          "LOCATION_ADDRESS_STATE": this.addVathiyarData.state,
          "LOCATION_ADDRESS_CITY": this.addVathiyarData.district,
          "LOCATION_ADDRESS_PINCODE": this.addVathiyarData.pincode,
          "CONTACT_NO": this.addVathiyarData.phoneNo,   
          "SERVICES": this.serviceSelectedItems,
          "LANGUAGE_ID": this.langSelectedItems,
          "LOCATION_PREFERENCE": this.locationSelectedItems,
          "COMMUNITY_ID": this.communitySelectedItems,         
          "NAME_OF_BANK": this.addVathiyarData.bankName,
          "BANK_ACC_NO": this.addVathiyarData.bankAccNo,
          "BANK_IFSC_CODE": this.addVathiyarData.bankIFSCCode,
          "UPI_ID": this.addVathiyarData.UPIID,
          "BANK_ACC_TYPE_ID": this.addVathiyarData.bankAccType,
          "UPI_NAME": this.addVathiyarData.UPIName,
          "CREATED_BY": this._val.USER_ID,

      }
      
      // Http call for add vathiyar
      this._gs.postCall(url, reqAddVathiyardata)
              .subscribe(
                res => {
                  console.log(res);
                  if(res.msgCode === "SUCC_MSG_9"){
                    this._router.navigate(['/vathiyars']);
                    this._gs.showSuccessToast(res['msg'], "Success");
                  } 
                },
                err => {
                  console.log(err);
                }
            )
    }
  }

  onEditVathiyar(){
    console.log('inside edit vathiyar');
      let url = environment.apiUrl + environment.url.EditVathiyar + this._val.EDIT_VATHIYAR_DATA.VATHIYAR_ID;
      let reqEditVathiyardata = {          
          "USER_TYPE": "Vathiyar",
          "FIRST_NAME": this.addVathiyarData.fname,
          "LAST_NAME": this.addVathiyarData.lname,
          "EMAIL_ID": this.addVathiyarData.email,
          "AADHAAR_NUMBER": this.addVathiyarData.aadharNumber,
          "AVATAR": "",
          "AADHAAR_CARD_IMAGE": "",
          "LOCATION_ADDRESS": this.addVathiyarData.address,
          "LOCATION_ADDRESS_COUNTRY": this.addVathiyarData.country,
          "LOCATION_ADDRESS_STATE": this.addVathiyarData.state,
          "LOCATION_ADDRESS_CITY": this.addVathiyarData.district,
          "LOCATION_ADDRESS_PINCODE": this.addVathiyarData.pincode,
          "CONTACT_NO": this.addVathiyarData.phoneNo,   
          "SERVICES": this.serviceSelectedItems,
          "LANGUAGE_ID": this.langSelectedItems,
          "LOCATION_PREFERENCE": this.locationSelectedItems,
          "COMMUNITY_ID": this.communitySelectedItems,         
          "NAME_OF_BANK": this.addVathiyarData.bankName,
          "BANK_ACC_NO": this.addVathiyarData.bankAccNo,
          "BANK_IFSC_CODE": this.addVathiyarData.bankIFSCCode,
          "UPI_ID": this.addVathiyarData.UPIID,
          "BANK_ACC_TYPE_ID": this.addVathiyarData.bankAccType,
          "UPI_NAME": this.addVathiyarData.UPIName,
          "CREATED_BY": this._val.USER_ID,

      }
      
      // Http call for add vathiyar
      this._gs.patchCall(url, reqEditVathiyardata)
              .subscribe(
                res => {
                  console.log(res);
                  if(res.msgCode === "SUCC_MSG_43"){
                    this._router.navigate(['/vathiyars']);
                    this._gs.showSuccessToast(res['msg'], "Success");
                  } 
                },
                err => {
                  console.log(err);
                }
            )
    
  }

  public onCancelVathiyar(){
    this._val.onCancel();
    this._router.navigate(['/vathiyars']);
  }

}
