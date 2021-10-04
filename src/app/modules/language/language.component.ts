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
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  public languagesList: any = [];
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
    this._ws.getAllLanguages();
    setTimeout(() => {
      if (this._val.LANGUAGES.length > 0) {
        this.languagesList = this._val.LANGUAGES;
        this.totNoOfPages = Math.ceil(this.languagesList.length / this.pageSize);
      }
    }, 500);
  }

  public onEditLanguage(languageData) {
    console.log(languageData);
    this._val.EDIT_LANGUAGE_DATA = languageData;
    this._val.isAddMode = false;
    this._router.navigate(['/addlanguage']);
  }

  public onClickDelete(languageData): void {
    const modalRef = this.modalService.open(MyModalComponent, 
      { title: 'Confirmation', message: 'Are you sure you want to delete the language?' });

    modalRef.onResult().subscribe(
      closed => console.log('closed', closed),
      dismissed => console.log('dismissed', dismissed),
      () => {
        this.onDeleteLanguage(languageData);
        console.log('completed')
      }
    );
  }

  public onDeleteLanguage(languageData) {

    let url = environment.apiUrl + environment.url.DeleteLanguage;
    let languageId = languageData.LANGUAGE_ID;
    
    this._gs.deletePost(url,languageId)
      .subscribe(
        (res) => {
          if(res['statusCode'] == 200 && res['msgCode'] === "SUCC_MSG_38"){
            console.log("Language deleted");
            this.ngOnInit();
            this._router.navigate(['/language']);
            this._gs.showSuccessToast(res['msg'], "Success")
          }
        },
        err => {
          console.log(err);
        }
    )
  }

}
