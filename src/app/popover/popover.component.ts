import { Component, OnInit } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {

  constructor(private overlay: Overlay) { }

  ngOnInit() {
    const overlayRef = overlay.create();
    const userProfilePortal = new ComponentPortal(UserProfile);
    overlayRef.attach(userProfilePortal);
  }

}
