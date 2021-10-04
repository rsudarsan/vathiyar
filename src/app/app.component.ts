import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Spinkit } from 'ng-http-loader';

// import global service
import { HttpGlobalService } from 'src/app/services/httpglobal.service';
import { ValuesService } from 'src/app/services/values.service';

import { environment } from 'src/environments/environment';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'workspace';
  spinnerStyle = Spinkit;
  public langs = ['en', 'ta'];


  constructor(public translate: TranslateService,
              private _gs: HttpGlobalService, 
              private _val: ValuesService,
              private _ws: WorkspaceService){
    translate.addLangs(['en' , 'ta']);
    translate.setDefaultLang('en');

    // //Get call for loading all the service categories
    // this._ws.getAllServiceCategories();
    // //Get call for loading all the languages
    // this._ws.getAllLanguages();
    // //Get call for loading all the locations
    // this._ws.getAllLocations(2);

  }

  public ngOnInit(): void {
    let browserlang = this.translate.getBrowserLang();
    if (this.langs.indexOf(browserlang) > -1) {
      this.translate.setDefaultLang(browserlang);
    } else {
      this.translate.setDefaultLang('en');
    }
  }
 
 
  public useLanguage(lang: string): void {
    this.translate.setDefaultLang(lang);
  }
}
