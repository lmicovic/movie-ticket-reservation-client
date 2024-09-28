import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
    
    let modal = document.getElementById("myModal");

    window.onclick = function(event) {
      if (event.target == modal) {
        modal!.style.display = "none";
      }
    }

  }

  openModal() {
    
    let modal = document.getElementById("myModal");
    modal!.style.display = "block";

  }

  closeModal() {
    
    let modal = document.getElementById("myModal");
    modal!.style.display = "none";

  }

}
