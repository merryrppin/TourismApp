import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calificacioninput',
  templateUrl: './calificacioninput.component.html',
  styleUrls: ['./calificacioninput.component.scss'],
})
export class CalificacioninputComponent implements OnInit {

  @Input() maxCalInput: string = "5";
  aCalificacion: any[];
  maxCal: number = 5;
  calValue: number = 0;

  @Output() calValueOutput = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.maxCal = parseInt(this.maxCalInput);

    this.aCalificacion = [];
    for (let i: number = 1; i <= this.maxCal; i++) {
      let checkedVal: boolean = false;
      let halfCheckedVal: boolean = false;
      let oCalificacion = {
        id: i,
        checked: checkedVal,
        halfChecked: halfCheckedVal
      };
      this.aCalificacion.push(oCalificacion);
    }
  }

  actualizarCalificacion(index: number) {
    this.calValue = index + 1;
    this.aCalificacion.forEach(element => {
      if (element.id <= this.calValue) {
        element.checked = true;
      } else {
        element.checked = false;
      }
    });
    this.calValueOutput.emit(this.calValue.toString());
  }

}
