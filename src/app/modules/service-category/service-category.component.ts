import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpGlobalService } from 'src/app/services/httpglobal.service';
import { ValuesService } from 'src/app/services/values.service';

import { environment } from 'src/environments/environment';
import { WorkspaceService } from 'src/app/services/workspace.service';

import { ModalService } from '../../modal-service/modal-service.service';
import { ModalRef } from '../../modal-service/models/modal-ref.model';
import { MyModalComponent } from '../../shared/components/my-modal.component';

@Component({
  selector: 'app-service-category',
  templateUrl: './service-category.component.html',
  styleUrls: ['./service-category.component.scss']
})
export class ServiceCategoryComponent implements OnInit {
  public categoryList:any = [];
  public page:number = 1;
  public pageSize:number = 10;
  public term: string;
  public totNoOfPages: number;
  public responseMsg: string;

  constructor(private _gs: HttpGlobalService,
              private _val: ValuesService,
              private _ws: WorkspaceService,
              private _router: Router,
              public modalService: ModalService) { }

  public ngOnInit(): void {
    this._ws.getAllServiceCategories();
      setTimeout(()=>{
        if(this._val.SERVICE_CATEGORIES.length > 0){
          this.categoryList = this._val.SERVICE_CATEGORIES;
          this.totNoOfPages = Math.ceil(this.categoryList.length/this.pageSize);
        }
      },500);     
  }
  public onEditServiceCategory(category) {
    this._val.EDIT_SERVICE_CATEGORY_DATA = category;
    this._val.isAddMode = false;
    this._router.navigate(['/addservicecategory']);
  }

  public onClickDelete(category): void {
    // this._delCalls.deleteAny('User', userData);
    const modalRef = this.modalService.open(MyModalComponent, 
      { title: 'Confirmation', message: 'Are you sure you want to delete the category?' });

    modalRef.onResult().subscribe(
      closed => console.log('closed', closed),
      dismissed => console.log('dismissed', dismissed),
      () => {
        this.onDeleteServiceCategory(category);
        console.log('completed')
      }
    );
  }

  public onDeleteServiceCategory(category) {

    let url = environment.apiUrl + environment.url.DeleteServiceCategory;
    let serviceCatId = category.SERVICE_CAT_ID;
    
    this._gs.deletePost(url,serviceCatId)
      .subscribe(
        (res) => {
          if(res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_26"){
            console.log("Service category deleted");
            this.ngOnInit();
            this._router.navigate(['/service-category']);
            this._gs.showSuccessToast(res['msg'], "Success")
          }
        },
        err => {
          console.log(err);
        }
    )
  }

}
