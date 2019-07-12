import { Component } from '@angular/core';
import {DialogService} from './popover/shared/overlay.service';
import {Content} from '@angular/compiler/src/render3/r3_ast';
import {ContentComponent} from './content/content.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private dialogService: DialogService) {

  }

  createOverlay(originEl: HTMLElement) {
    this.dialogService.open(ContentComponent, {showCloseButton: false, origin: originEl, backdropClass: 'popover-backdrop'});
  }
}
