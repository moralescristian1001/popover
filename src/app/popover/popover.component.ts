import {Component, ComponentRef, ViewChild} from '@angular/core';
import {CdkPortalOutlet, ComponentPortal} from '@angular/cdk/portal';
import {DialogRef} from './shared/overlay-ref';
import {DialogConfig} from './shared/overlay-config';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent  <T, D = any, R = any> {
  @ViewChild(CdkPortalOutlet) portalOutlet: CdkPortalOutlet;

header?: string;

showCloseButton?: boolean;

constructor(private dialogRef: DialogRef<T, R>, private dialogConfig: DialogConfig<D>) {
  this.header = this.dialogConfig.header;
  this.showCloseButton = this.dialogConfig.showCloseButton;
}

attachComponentPortal(componentPortal: ComponentPortal<T>): ComponentRef<T> {
  return this.portalOutlet.attach(componentPortal);
}

get hasHeader(): boolean {
  return !!(this.header || this.showCloseButton);
}

close(): void {
  this.dialogRef.close();
}
}
