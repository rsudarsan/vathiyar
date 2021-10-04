import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { ActivatedRoute, Router } from '@angular/router';

import { ValuesService } from 'src/app/services/values.service';
import { HttpGlobalService } from 'src/app/services/httpglobal.service';
import { environment } from 'src/environments/environment';

import { ModalService } from '../../modal-service/modal-service.service';
import { ModalRef } from '../../modal-service/models/modal-ref.model';
import { MyModalComponent } from '../../shared/components/my-modal.component';

@Component({
  selector: 'app-vathiyars',
  templateUrl: './vathiyars.component.html'
 
})
export class VathiyarsComponent implements OnInit {

  public vathiyarsList:any = [];
  public term: string;
  public page: number = 1;
  public pageSize: number = 10;
  public totNoOfPages: number;
  public responseMsg: string;

  constructor(private _ws:WorkspaceService,
              private _val: ValuesService,              
              private _gs: HttpGlobalService,
              private _router: Router,
              public modalService: ModalService) {}

  ngOnInit(): void {
    this._ws.getAllVathiyars();
    setTimeout(()=>{
      if(this._val.VATHIYARS.length > 0){
        this.vathiyarsList = this._val.VATHIYARS;
        this.totNoOfPages = Math.ceil(this.vathiyarsList.length/this.pageSize);
      }
      else{
        this.responseMsg = this._val.responseMsg;
      }
    },1000);
  }

  onEditVathiyar(vathiyarData: any) {
    this._val.EDIT_VATHIYAR_DATA = vathiyarData;
    this._val.isAddMode = false;
    this._router.navigate(['/addvathiyar']);
  }

  public onClickDelete(vathiyarData): void {
    // this._delCalls.deleteAny('User', userData);
    const modalRef = this.modalService.open(MyModalComponent, 
      { title: 'Confirmation', message: 'Are you sure you want to delete the vathiyar?' });

    modalRef.onResult().subscribe(
      closed => console.log('closed', closed),
      dismissed => console.log('dismissed', dismissed),
      () => {
        this.onDeleteVathiyar(vathiyarData);
        console.log('completed')
      }
    );
  }

  onDeleteVathiyar(vathiyarData: any){
    let url = environment.apiUrl + environment.url.DeleteVathiyar;
    let vathiyarId = vathiyarData.VATHIYAR_ID;
    
    this._gs.deletePost(url,vathiyarId)
      .subscribe(
        (res) => {
          if(res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_10"){
            console.log("Vathiyar deleted");
            this.ngOnInit(); 
            this._router.navigate(['/vathiyars']);
                       
            this._gs.showSuccessToast(res['msg'], "Success")
          }
        },
        err => {
          console.log(err);
        }
    )
  }

}
