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
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  public packagesList: any = [];
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
      this._ws.getAllPackages();
      setTimeout(() => {
        if (this._val.PACKAGES.length > 0) {
          this.packagesList = this._val.PACKAGES;
          this.totNoOfPages = Math.ceil(this.packagesList.length / this.pageSize);
        }
      }, 500);
    }

    public onEditPackage(packageData) {
      console.log(packageData);
      this._val.EDIT_PACKAGE_DATA = packageData;
      this._val.isAddMode = false;
      this._router.navigate(['/addpackage']);
    }

    public onClickDelete(packageData): void {
      // this._delCalls.deleteAny('User', userData);
      const modalRef = this.modalService.open(MyModalComponent, 
        { title: 'Confirmation', message: 'Are you sure you want to delete the package?' });
  
      modalRef.onResult().subscribe(
        closed => console.log('closed', closed),
        dismissed => console.log('dismissed', dismissed),
        () => {
          this.onDeletePackage(packageData);
          console.log('completed')
        }
      );
    }
  
    public onDeletePackage(packageData) {
  
      let url = environment.apiUrl + environment.url.DeletePackage;
      let packageId = packageData.PACKAGE_ID;
      
      this._gs.deletePost(url,packageId)
        .subscribe(
          (res) => {
            if(res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_29"){
              console.log("Package deleted");
              this.ngOnInit();
              this._router.navigate(['/package']);
              this._gs.showSuccessToast(res['msg'], "Success")
            }
          },
          err => {
            console.log(err);
          }
      )
    }

}
