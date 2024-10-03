import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faXmark, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { MovieDTO } from '../../../../other/models/movie/movieDTO.interface';
import { Movie } from '../../../../other/models/movie/movie.class';
import { MovieGenre } from '../../../../other/enums';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.css'
})
export class ChipsComponent {

  cancelIcon: IconDefinition = faXmark;

  //------------------------------------------------------------------------
  // Input Values
  //------------------------------------------------------------------------
  @Input("width")
  width: string = "100%";
  
  @Input("inputFieldWidth")
  inputFieldWidth: string = "80%";
  
  @Input("addButtonWidth")
  addButtonWidth: string = "10%"

  @Input("addButtonTop")
  addButtonTop: string = "";

  @Input("resultFieldWidth")
  resultFieldWidth: string = "90%";

  @Input("values")
  values: string[] = [];

  @Input("disabled")
  disabled: boolean = false;

  @Output("newValueEventEmmiter")
  newValueEventEmmiter = new EventEmitter();

  newValues: string[] = this.values;

  //------------------------------------------------------------------------

  constructor() {

  }

  //------------------------------------------------------------------------
  // Reset Text Input
  //------------------------------------------------------------------------
  resetInput(inputText: any) {
    inputText.value = "";
  }
  //------------------------------------------------------------------------


  //------------------------------------------------------------------------
  // Add Value from Text Input
  //------------------------------------------------------------------------
  addValue(inputText: any) {

    if(inputText.value !== "") {
      this.values.push(inputText.value);
      this.newValues = this.values;
      this.newValueEventEmmiter.emit(this.newValues);
    }
    
    inputText.value = "";

  } 
  //------------------------------------------------------------------------

  //------------------------------------------------------------------------
  // Remove value from Values
  //------------------------------------------------------------------------
  removeValue(index: number) {
    this.values.splice(index, 1);     // Remove only one item at n-th index
    this.newValues = this.values;
    this.newValueEventEmmiter.emit(this.newValues);
  }
  //------------------------------------------------------------------------



}
