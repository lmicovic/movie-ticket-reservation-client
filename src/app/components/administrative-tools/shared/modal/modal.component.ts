import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {

  @Input("openModal")
  openModal: boolean = false;

  @Input("modalHeader")
  modalHeader: string = "Modal Header";

  @Input("modalText")
  modalText: string = "Modal Text";

  @Input("returnUrl")
  returnUrl: string | null = "";

  @Output("modalChange")
  modalChange = new EventEmitter();

  @Output("returnValue")
  returnValue = new EventEmitter();
  value: boolean = false;



  constructor(private router: Router) {

  }

  ngOnInit(): void {
    
    // Close modal on Click outside of modal
    let modal = document.getElementById("myModal");
    let modalOpened = this.openModal;
    let modalChange = this.modalChange;

    window.onclick = function(event) {
      if (event.target == modal) {
        modal!.style.display = "none";
        modalOpened = false;
        modalChange.emit(modalOpened);
      }
    }

  }

  onButtonOk() {

    if(this.returnUrl !== null) {
      this.router.navigateByUrl(this.returnUrl as string);
    }
    else {
      console.error("returnUrl is: " + this.returnUrl);
    }
        
  }

  // Close Modal when Clicked on Close button
  closeModal() {
    
    let modal = document.getElementById("myModal");
    modal!.style.display = "none";
    this.openModal = false;
    this.modalChange.emit(this.openModal);

  }

}
