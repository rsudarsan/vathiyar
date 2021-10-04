import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.scss']
})
export class TabContentComponent implements OnInit {

  @Input() data: any[];
  term: string;

  public page = 1;
  public pageSize:number = 10;
  public totNoOfPages: number;
  
  constructor() { }

  ngOnInit(): void {
    this.totNoOfPages = Math.ceil(this.data.length/this.pageSize);
  }

}
