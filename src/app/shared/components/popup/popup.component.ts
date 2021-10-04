import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() title: string = '';
  @Input() body: string = '';
  @Input() ok: string = '';
  @Input() cancel: string = '';
  @Input() fromComponent: string = '';
  @Output() newItemEvent = new EventEmitter<string>();

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  onCancel() {
    console.log('in cancel');
    this.activeModal.dismiss(false);
  }

  onOk() {
    console.log('in ok');
    this.activeModal.close(true);
    
    // this.newItemEvent.emit('ok');
  }

}
