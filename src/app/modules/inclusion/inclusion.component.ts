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
  selector: 'app-inclusion',
  templateUrl: './inclusion.component.html',
  styleUrls: ['./inclusion.component.scss']
})
export class InclusionComponent implements OnInit {
  public inclusionsList: any = [];
  public page: number = 1;
  public pageSize: number = 10;
  public term: string;
  public totNoOfPages: number;
  public responseMsg: string;

  constructor(private _gs: HttpGlobalService,
    private _val: ValuesService,
    private _ws: WorkspaceService,
    private _router: Router,
    public modalService: ModalService) { }

    public ngOnInit(): void {
      this._ws.getAllInclusions();
      setTimeout(() => {
        if (this._val.INCLUSIONS.length > 0) {
          this.inclusionsList = this._val.INCLUSIONS;
          this.totNoOfPages = Math.ceil(this.inclusionsList.length / this.pageSize);
        }
      }, 500);
    }

    public onEditInclusion(inclusionData) {
      console.log(inclusionData);
      this._val.EDIT_INCLUSION_DATA = inclusionData;
      this._val.isAddMode = false;
      this._router.navigate(['/addinclusion']);
    }

    public onClickDelete(inclusionData): void {
      const modalRef = this.modalService.open(MyModalComponent, 
        { title: 'Confirmation', message: 'Are you sure you want to delete the inclusion?' });
  
      modalRef.onResult().subscribe(
        closed => console.log('closed', closed),
        dismissed => console.log('dismissed', dismissed),
        () => {
          this.onDeleteInclusion(inclusionData);
          console.log('completed')
        }
      );
    }
  
    public onDeleteInclusion(inclusionData) {
  
      let url = environment.apiUrl + environment.url.DeleteInclusion;
      let inclusionId = inclusionData.INCLUSIONS_ID;
      
      this._gs.deletePost(url,inclusionId)
        .subscribe(
          (res) => {
            if(res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_32"){
              console.log("Inclusion deleted");
              this.ngOnInit();
              this._router.navigate(['/inclusion']);
              this._gs.showSuccessToast(res['msg'], "Success")
            }
          },
          err => {
            console.log(err);
          }
      )
    }

}
