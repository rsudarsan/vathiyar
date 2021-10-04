import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

// import global service
import { HttpGlobalService } from 'src/app/services/httpglobal.service';
import { ValuesService } from 'src/app/services/values.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  get windowRef() {
    return window
  }

  constructor(private http: HttpClient,
    private _gs: HttpGlobalService,
    private _val: ValuesService) {
  }

  // Get all users call
  getAllUsers(): any{
    let url = environment.apiUrl + environment.url.GetAllUsers;
    // HTTP Get call to retrieve all the users from backend
    this._gs.getCall(url)
      .subscribe(
        (res) => {
          if(res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_2"){
            this._val.USERS = res['users']
          }else if (res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_20") {
            this._val.responseMsg = res['msg'];
          }
        },
        err => {
          console.log(err);
        }
    )
  }


  // Get all service call
  getAllServices(): any {
    console.log("getall services");
    let serviceUrl = environment.apiUrl + environment.url.GetAllServices;
    this._gs.getCall(serviceUrl)
      .subscribe(
        (res) => {
          console.log(res);
          if (res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_2") {
            this._val.SERVICES = res['services'];
          }else if (res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_12") {
            this._val.responseMsg = res['msg'];
          }
        },
        err => {
          console.log(err);
        })
  }

  // Get all service categories call
  getAllServiceCategories(): any {
    console.log("getall categories");
    let serviceCategoryUrl = environment.apiUrl + environment.url.GetAllCategories;
    this._gs.getCall(serviceCategoryUrl)
      .subscribe(
        (res) => {
          if(res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_2"){
            console.log(res['categories']);
            this._val.SERVICE_CATEGORIES = res['categories'];
          }
        },
        err => {
          console.log(err);
        }
    )
  }

  // Get all languages call
  getAllLanguages(): any {
    console.log("getall languages");
    let languageUrl = environment.apiUrl + environment.url.GetAllLanguages;
    this._gs.getCall(languageUrl)
      .subscribe(
        (res) => {
          if (res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_2") {
            this._val.LANGUAGES = res['languages'];
          }
        },
        err => {
          console.log(err);
        }
      )
  }

  // Get all states call
  getAllStates(): any{
    console.log("getall states");
    let stateUrl = environment.apiUrl + environment.url.GetAllStates;
    this._gs.getCall(stateUrl)
      .subscribe(
        (res) => {
          if (res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_2") {
            this._val.STATES = res['states'];
          }
        },
        err => {
          console.log(err);
        }
      )
  }

  // Get all districts call
  getAllDistricts(stateId): any{
    console.log("getall districts");
    let districtUrl = environment.apiUrl + environment.url.GetAllDistricts + "?stateId=" + stateId;
    this._gs.getCall(districtUrl)
      .subscribe(
        (res) => {
          if (res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_2") {
            this._val.DISTRICTS = res['districts'];
          }
        },
        err => {
          console.log(err);
        }
      )
  }

  // Get all locations call
  getAllLocations(districtId): any{
    console.log("getall locations");
    let locationUrl = environment.apiUrl + environment.url.GetAllLocations + "?districtId=" + districtId;
    this._gs.getCall(locationUrl)
      .subscribe(
        (res) => {
          if (res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_2") {
            this._val.LOCATIONS = res['locations'];
          }
        },
        err => {
          console.log(err);
        }
      )
  }

  // Get all Vathiyars call
  getAllVathiyars(): any{
    console.log("getall vathiyars");
    let vathiyarUrl = environment.apiUrl + environment.url.GetAllVathiyars;
    this._gs.getCall(vathiyarUrl)
      .subscribe(
        (res) => {
          console.log(res)
          if (res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_2") {
            this._val.VATHIYARS = res['vathiyars'];
            console.log(this._val.VATHIYARS);
          } else if (res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_11") {
            this._val.responseMsg = res['msg'];
          }
        },
        err => {
          console.log(err);
        }
      )
  }

  // get all bookings call
  getBookings(): any{
    let url = environment.apiUrl + environment.url.GetAllBookings;
    this._gs.getCall(url)
      .subscribe(
        (res) => {
          if (res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_2") {
            this._val.BOOKINGS = res['bookings'];
            console.log(this._val.BOOKINGS);
          } else if (res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_15") {
            this._val.responseMsg = res['msg'];
          }
        },
        err => {
          console.log(err);
        })
  }

  // get all reviews call
  getAllReviews(): any{
    let url = environment.apiUrl + environment.url.GetAllReviews;
      this._gs.getCall(url)
        .subscribe(
          (res) => {
            if(res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_2"){
              console.log(res['reviews']);
              this._val.REVIEWS = res['reviews'];
              console.log(this._val.REVIEWS);
            }
          },
          err => {
            console.log(err);
          }
      )
  }

  // get all packages call
  getAllPackages(): any{
    let url = environment.apiUrl + environment.url.GetAllPackages;
      this._gs.getCall(url)
        .subscribe(
          (res) => {
            if(res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_2"){
              console.log(res['packages']);
              this._val.PACKAGES = res['packages'];
              console.log(this._val.PACKAGES);
            }
          },
          err => {
            console.log(err);
          }
      )
  }

  // get all inclusions call
  getAllInclusions(): any{
    let url = environment.apiUrl + environment.url.GetAllInclusions;
      this._gs.getCall(url)
        .subscribe(
          (res) => {
            if(res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_2"){
              console.log(res['inclusions']);
              this._val.INCLUSIONS = res['inclusions'];
              console.log(this._val.INCLUSIONS);
            }
          },
          err => {
            console.log(err);
          }
      )
  }

  // get all communities call
  getAllCommunities(): any{
    let url = environment.apiUrl + environment.url.GetAllCommunities;
      this._gs.getCall(url)
        .subscribe(
          (res) => {
            if(res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_2"){
              console.log(res['communities']);
              this._val.COMMUNITIES = res['communities'];
              console.log(this._val.COMMUNITIES);
            }
          },
          err => {
            console.log(err);
          }
      )
  }

  // get all account types call
  getAllAccountTypes(): any{
    let url = environment.apiUrl + environment.url.GetAllAccountTypes;
      this._gs.getCall(url)
        .subscribe(
          (res) => {
            if(res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_2"){
              console.log(res['accountTypes']);
              this._val.ACCOUNT_TYPES = res['accountTypes'];
              console.log(this._val.ACCOUNT_TYPES);
            }
          },
          err => {
            console.log(err);
          }
      )
  }
  
  getCoupons(): Observable<any> {
    // return this.http.get(this.basePath + '/WidgetList');
    return this.http.get('/assets/jsonStubs/coupons.json');
  }

  // public confirm(title: string, message: string): Promise<boolean> {
  //   const modalRef = this._modalService.open(PopupComponent);
  //   modalRef.componentInstance.title = title;
  //   modalRef.componentInstance.body = message;
  //   modalRef.componentInstance.ok = "OK";
  //   modalRef.componentInstance.cancel = "Cancel";
  //   // console.log(modalRef.result);
  //   return modalRef.result
  //   // .then((result) => {
  //   //   console.log(result);
  //   // });

  //   // this._modalService.open(content, { centered: true });
  // }

  // public onConfirmDelete(fromComponent: string) {
  //   console.log('inside delete'+fromComponent);
  // }
}
