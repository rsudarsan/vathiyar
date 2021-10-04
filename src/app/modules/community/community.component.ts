import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpGlobalService } from 'src/app/services/httpglobal.service';
import { ValuesService } from 'src/app/services/values.service';

import { environment } from 'src/environments/environment';
import { WorkspaceService } from 'src/app/services/workspace.service';
// import { DeleteCallsService } from 'src/app/services/deletecalls.service';

import { ModalService } from '../../modal-service/modal-service.service';
import { ModalRef } from '../../modal-service/models/modal-ref.model';
import { MyModalComponent } from '../../shared/components/my-modal.component';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  public communitiesList: any = [];
  public page: number = 1;
  public pageSize: number = 10;
  public term: string;
  public totNoOfPages: number;
  public responseMsg: string;

  constructor(private _gs: HttpGlobalService,
    public val: ValuesService,
    private _ws: WorkspaceService,
    private _router: Router,
    public modalService: ModalService) { }

    public ngOnInit(): void {
      this._ws.getAllCommunities();
      setTimeout(() => {
        if (this.val.COMMUNITIES.length > 0) {
          this.communitiesList = this.val.COMMUNITIES;
          this.totNoOfPages = Math.ceil(this.communitiesList.length / this.pageSize);
        }
      }, 500);
    }

    public onEditCommunity(communityData) {
      console.log(communityData);
      this.val.EDIT_COMMUNITY_DATA = communityData;
      this.val.isAddMode = false;
      this._router.navigate(['/addcommunity']);
    }
  
    public onClickDelete(communityData): void {
      const modalRef = this.modalService.open(MyModalComponent, 
        { title: 'Confirmation', message: 'Are you sure you want to delete the community?' });
  
      modalRef.onResult().subscribe(
        closed => console.log('closed', closed),
        dismissed => console.log('dismissed', dismissed),
        () => {
          this.onDeleteCommunity(communityData);
          console.log('completed')
        }
      );
    }

    public onDeleteCommunity(communityData) {
  
      let url = environment.apiUrl + environment.url.DeleteCommunity;
      let communityId = communityData.COMMUNITY_ID;
      
      this._gs.deletePost(url,communityId)
        .subscribe(
          (res) => {
            if(res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_35"){
              console.log("Community deleted");
              this.ngOnInit();
              this._router.navigate(['/community']);
              this._gs.showSuccessToast(res['msg'], "Success")
            }
          },
          err => {
            console.log(err);
          }
      )
    }

    

}
