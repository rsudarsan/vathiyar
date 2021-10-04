import { Component, OnInit } from '@angular/core';
import { HttpGlobalService } from 'src/app/services/httpglobal.service';
import { ValuesService } from 'src/app/services/values.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { WorkspaceService } from 'src/app/services/workspace.service';

import { ModalService } from '../../modal-service/modal-service.service';
import { ModalRef } from '../../modal-service/models/modal-ref.model';
import { MyModalComponent } from '../../shared/components/my-modal.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  public locationsList: any = [];
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
    this._ws.getAllLocations(2);
    setTimeout(() => {
      if (this._val.LOCATIONS.length > 0) {
        this.locationsList = this._val.LOCATIONS;
        this.totNoOfPages = Math.ceil(this.locationsList.length / this.pageSize);
      }
    }, 500);
  }

  public onEditLocation(locationData) {
    console.log(locationData);
    this._val.EDIT_LOCATION_DATA = locationData;
    this._val.isAddMode = false;
    this._router.navigate(['/addlocation']);
  }

  public onClickDelete(locationData): void {
    const modalRef = this.modalService.open(MyModalComponent, 
      { title: 'Confirmation', message: 'Are you sure you want to delete the location?' });

    modalRef.onResult().subscribe(
      closed => console.log('closed', closed),
      dismissed => console.log('dismissed', dismissed),
      () => {
        this.onDeleteLocation(locationData);
        console.log('completed')
      }
    );
  }

  public onDeleteLocation(locationData) {

    let url = environment.apiUrl + environment.url.DeleteLocation;
    let locationId = locationData.LOCATION_ID;
    
    this._gs.deletePost(url,locationId)
      .subscribe(
        (res) => {
          if(res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_41"){
            console.log("Location deleted");
            this.ngOnInit();
            this._router.navigate(['/location']);
            this._gs.showSuccessToast(res['msg'], "Success")
          }
        },
        err => {
          console.log(err);
        }
    )
  }

}
