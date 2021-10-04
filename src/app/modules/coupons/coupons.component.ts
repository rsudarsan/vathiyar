import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkspaceService } from 'src/app/services/workspace.service';

import { ModalService } from '../../modal-service/modal-service.service';
import { ModalRef } from '../../modal-service/models/modal-ref.model';
import { MyModalComponent } from '../../shared/components/my-modal.component';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html'
})
export class CouponsComponent implements OnInit {

  couponList:any;
  page = 1;
  term: string;

  constructor(private workspaceService:WorkspaceService,    
              public modalService: ModalService) {}

  ngOnInit(): void {
    this.workspaceService.getCoupons().subscribe((res)=>{
      this.couponList = res;
      console.log(this.couponList);
      //this.setRecordPerPage();
    })
    
  }

}
