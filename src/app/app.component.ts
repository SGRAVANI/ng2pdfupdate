import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from './components/modal/modal.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild ('Modal') Modal!:ModalComponent
  title = 'ng2pdfdemo';
  openModal() {
    this.Modal.open();
  }
}
