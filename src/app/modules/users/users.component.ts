import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
  
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { HttpGlobalService } from 'src/app/services/httpglobal.service';
import { ValuesService } from 'src/app/services/values.service';
import { WorkspaceService } from 'src/app/services/workspace.service';
// import { DeleteCallsService } from 'src/app/services/deletecalls.service';
import { environment } from 'src/environments/environment';
// import { PopupComponent } from '../../shared/components/popup/popup.component';
import { ModalService } from '../../modal-service/modal-service.service';
import { ModalRef } from '../../modal-service/models/modal-ref.model';
import { MyModalComponent } from '../../shared/components/my-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  providers: [NgbDropdownConfig]
})

export class UsersComponent implements OnInit {

  public usersList:any = [];
  public page:number = 1;
  public pageSize:number = 10;
  public term: string;
  public totNoOfPages: number;
  public responseMsg: string;
  
  public message: string = "";

  constructor(private _activatedRoute: ActivatedRoute,
              public translate: TranslateService,
              private _gs: HttpGlobalService, 
              private _router: Router,
              private _val: ValuesService,
              private _ws: WorkspaceService,
              public modalService: ModalService) {}

  public ngOnInit(): void {
    this._ws.getAllUsers();   
    setTimeout(()=>{
      if(this._val.USERS.length > 0){
        this.usersList = this._val.USERS;
        this.totNoOfPages = Math.ceil(this.usersList.length/this.pageSize);
      }
      else{
        this.responseMsg = this._val.responseMsg;
      }
    },500); 
  }

  public onEditUser(user) {
    this._val.EDIT_USER_DATA = user;
    this._val.isAddMode = false;
    this._router.navigate(['/adduser']);
  }

  // public onClickDelete(userData){
  //   let title = "Please confirm..";
  //   let msg= "Do you want to proceed?";
  //     this._ws.confirm(title, msg)
  //     .then((result) => {
  //       console.log(result);
  //       this.message= "User confirmed"
  //     })
  //     .catch(() => {
  //       console.log('in catch');
  //       this.message= "User declined"
  //     } );
  // }

  public onClickDelete(userData): void {
    // this._delCalls.deleteAny('User', userData);
    const modalRef = this.modalService.open(MyModalComponent, 
      { title: 'Confirmation', message: 'Are you sure you want to delete the user?' });

    modalRef.onResult().subscribe(
      closed => console.log('closed', closed),
      dismissed => console.log('dismissed', dismissed),
      () => {
        this.onDeleteUser(userData);
        console.log('completed')
      }
    );
  }


  public onDeleteUser(userData) {
    let url = environment.apiUrl + environment.url.DeleteUser;
    let userId = userData.USER_ID;
    
    this._gs.deletePost(url,userId)
      .subscribe(
        (res) => {
          if(res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_4"){
            console.log("User deleted");
            this.ngOnInit();
            this._router.navigate(['/users']);
            this._gs.showSuccessToast(res['msg'], "Success")
          }
        },
        err => {
          console.log(err);
        }
    )
  }

}
