import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.scss'],
})
export class CalificacionComponent implements OnInit {

  @Input() calValueInput: string = "0";
  @Input() maxCalInput: string = "5";
  aCalificacion: any[];
  calValue: number = 0;
  maxCal: number = 5;

  constructor() { }

  ngOnInit() {
    this.calValue = parseFloat(this.calValueInput);
    this.maxCal = parseInt(this.maxCalInput);

    this.calValue = parseFloat(this.calValue.toFixed(1));
    let decimalPart: number = this.calValue % 1;
    let integerPart: number = Math.floor(this.calValue);

    this.aCalificacion = [];
    for (let i: number = 1; i <= this.maxCal; i++) {
      let checkedVal: boolean = false;
      let halfCheckedVal: boolean = false;
      if (integerPart >= i) {
        checkedVal = true;
      } else if (decimalPart > 0 && integerPart + 1 == i) {
        halfCheckedVal = true;
      }
      let oCalificacion = {
        id: i,
        checked: checkedVal,
        halfChecked: halfCheckedVal
      };
      this.aCalificacion.push(oCalificacion);
    }

  }

}
