import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {

  public isAddMode: boolean = true;

  public USER_ID: number;
  public USER_TYPE: string;  
  public EDIT_USER_DATA: any;
  public EDIT_SERVICE_DATA: any;
  public EDIT_VATHIYAR_DATA: any;
  public EDIT_SERVICE_CATEGORY_DATA: any;
  public EDIT_PACKAGE_DATA: any;
  public EDIT_INCLUSION_DATA: any;
  public EDIT_LOCATION_DATA: any;
  public EDIT_LANGUAGE_DATA: any;
  public EDIT_COMMUNITY_DATA: any;
  
  public USERS: any[] = [];
  public SERVICES: any[] = [];
  public SERVICE_CATEGORIES: any[] = [];
  public LANGUAGES: any[] = [];
  public STATES: any[] = [];
  public DISTRICTS: any[] = [];
  public LOCATIONS: any[] = [];
  public VATHIYARS: any[] = [];
  public BOOKINGS: any[] = [];
  public REVIEWS: any[] = [];
  public PACKAGES: any[] = [];
  public INCLUSIONS: any[] = [];
  public COMMUNITIES: any[] = [];
  public ACCOUNT_TYPES: any[] = [];

  public responseMsg: any = '';


  constructor() { }

  public onCancel(){
    this.isAddMode = true;
    this.EDIT_VATHIYAR_DATA = '';
    this.EDIT_USER_DATA = '';
    this.EDIT_SERVICE_DATA = '';
    this.EDIT_VATHIYAR_DATA = '';
    this.EDIT_SERVICE_CATEGORY_DATA = '';
    this.EDIT_PACKAGE_DATA = '';
    this.EDIT_INCLUSION_DATA = '';
    this.EDIT_LOCATION_DATA = '';
    this.EDIT_LANGUAGE_DATA = '';
    this.EDIT_COMMUNITY_DATA = '';
  }


  
}
