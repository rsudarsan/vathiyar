import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

// import global service
import { HttpGlobalService } from 'src/app/services/httpglobal.service';
import { ValuesService } from 'src/app/services/values.service';

import { environment } from 'src/environments/environment';
import { WorkspaceService } from 'src/app/services/workspace.service';

import { ModalService } from '../../modal-service/modal-service.service';
import { ModalRef } from '../../modal-service/models/modal-ref.model';
import { MyModalComponent } from '../../shared/components/my-modal.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  providers: [NgbDropdownConfig]
  
})
export class OrdersComponent implements OnInit {

  public ordersList:any = [];
  public page:number = 1;
  public pageSize:number = 10;
  public term: string;
  public totNoOfPages: number;
  public responseMsg: string;

  constructor(private _gs: HttpGlobalService, 
              private _router: Router,
              public val: ValuesService,
              private _ws: WorkspaceService,
              public modalService: ModalService) {

  }

  public ngOnInit(): void {
      this._ws.getAllServices();
      this._ws.getAllServiceCategories();
      setTimeout(()=>{
        if(this.val.SERVICES.length > 0){
          this.ordersList = this.val.SERVICES;
          this.totNoOfPages = Math.ceil(this.ordersList.length/this.pageSize);
        }
        else{
          this.responseMsg = this.val.responseMsg;
        }
      },500);    
  }

  onEditService(order) {
    this.val.EDIT_SERVICE_DATA = order;
    this.val.isAddMode = false;
    this._router.navigate(['/addservice']);
  }

  public onClickDelete(serviceData): void {
    // this._delCalls.deleteAny('User', userData);
    const modalRef = this.modalService.open(MyModalComponent, 
      { title: 'Confirmation', message: 'Are you sure you want to delete the service?' });

    modalRef.onResult().subscribe(
      closed => console.log('closed', closed),
      dismissed => console.log('dismissed', dismissed),
      () => {
        this.onDeleteService(serviceData);
        console.log('completed')
      }
    );
  }

  onDeleteService(serviceData) {
    let url = environment.apiUrl + environment.url.DeleteService;
    let serviceId = serviceData.SERVICE_ID;
    
    this._gs.deletePost(url,serviceId)
      .subscribe(
        (res) => {
          if(res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_7"){
            console.log("Service deleted");
            this.ngOnInit();
            this._router.navigate(['/orders']);
            this._gs.showSuccessToast(res['msg'], "Success");
          }
        },
        err => {
          console.log(err);
        }
    )
  }
}