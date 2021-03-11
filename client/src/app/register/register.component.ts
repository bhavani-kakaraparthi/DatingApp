import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeComponent: any; //for parent to child communication i.e., from home to register componenet
  @Output() cancelRegister = new EventEmitter(); // for child to parent communication i.e., register to home component
  model: any = {};

  constructor() { }

  ngOnInit(): void {
  }
  register() {
    console.log(this.model);
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}