import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";

@Component({
  selector: "ion-accordion",
  templateUrl: "ion-accordion.component.html",
  styleUrls: ["./ion-accordion.component.scss"],
  animations: [
    trigger("itemExpandable", [
      state("expandable", style({ height: "*" })),
      state(
        "unexpansive",
        style({ height: "0px", minHeight: "0" })
      ),
      transition(
        "expandable <=> unexpansive",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class IonAccordionComponent implements OnInit {

  _expanded: boolean = false;

  @Output() expandedChange = new EventEmitter<any>();
  @Input()
  get expanded(): boolean {
    return this._expanded;
  }
  set expanded(val: boolean) {
    this._expanded = val
    this.expandedChange.emit(this._expanded);
  }

  @Input() title: string = "";
  @Input() openIcon: string = "add-circle";
  @Input() closeIcon: string = "remove-circle";
  @Input() color: string = undefined;
  @Input() classTitle: string = "";
  @Output() ionChange = new EventEmitter<boolean>();

  constructor() { }
  ngOnInit(): void { }
  onClick() {
    this.expanded = !this.expanded;
    this.ionChange.emit(this.expanded);
  }
}
