import { Component } from '@angular/core';

import { Modal } from '../../modal-service/models/modal.model';

@Component({
  selector: 'my-modal',
  templateUrl: './my-modal.component.html'
})
export class MyModalComponent extends Modal {

  title: string;
  message: string;

  onInjectInputs(inputs): void {
    this.title = inputs.title;
    this.message = inputs.message;
  }

  save(): void {
    this.close('saving');
    this.removeBackdrop();
    
  }

  cancel(): void {
    this.dismiss('canceling');
    this.removeBackdrop();
    
  }

  removeBackdrop(): void{
    var element = document.getElementById("modalBackdrop");
    // element.classList.remove("modal-backdrop", "in");
    element.remove();
  }

}