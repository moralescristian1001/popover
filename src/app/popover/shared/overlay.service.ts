import { Injectable, InjectionToken, Injector } from '@angular/core';

import {
  Overlay,
  OverlayConfig,
  ComponentType,
  OverlayRef, ConnectionPositionPair,
} from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import {DEFAULT_DIALOG_CONFIG, DEFAULT_POPOVER_CONFIG, DialogConfig} from './overlay-config';
import {DialogRef} from './overlay-ref';
import {PopoverComponent} from '../popover.component';

export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');

@Injectable()
export class DialogService {
  constructor(private injector: Injector, private overlay: Overlay) {}

  open<T, D = any, R = any>(
    componentRef: ComponentType<T>,
    config: DialogConfig<D>,
  ): DialogRef<T, R> {
    const overlayRef = this.createDialogOverlay(config);
    const dialogRef = new DialogRef<T, R>(overlayRef);

    const dialogPortal = this.createDialogPortal<T, D, R>(config, dialogRef);
    const dialogComponent = overlayRef.attach(dialogPortal).instance;

    const componentPortal = this.createComponentPortal(
      componentRef,
      config,
      dialogRef
    );
    const attachedComponentInstance = dialogComponent.attachComponentPortal(
      componentPortal
    ).instance;
    dialogRef.componentInstance = attachedComponentInstance;
    return dialogRef;
  }

  private createDialogOverlay(config: DialogConfig): OverlayRef {
    const dialogOverlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(dialogOverlayConfig);
  }

  private getOverlayConfig(config: DialogConfig): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(config.origin)
      .withPositions(this.getPositionLeft())
      .withFlexibleDimensions(false)
      .withPush(false);
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      height: config.height,
      width: config.width,
      minHeight: config.minHeight,
      minWidth: config.minWidth,
      maxHeight: config.maxHeight,
      maxWidth: config.maxWidth,
      positionStrategy,
    });
    return overlayConfig;
  }

  private createDialogPortal<T, D, R>(
    config: DialogConfig<D>,
    dialogRef: DialogRef<T, R>
  ): ComponentPortal<PopoverComponent<T, D, R>> {
    const dialogInjector = this.createDialogInjector(config, dialogRef);
    const dialogPortal = new ComponentPortal<PopoverComponent<T, D, R>>(
      PopoverComponent,
      null,
      dialogInjector
    );
    return dialogPortal;
  }

  private createDialogInjector<T, D, R>(
    config: DialogConfig<D>,
    dialogRef: DialogRef<T, R>
  ): PortalInjector {
    const injectionTokens = new WeakMap<any, any>([
      [DialogRef, dialogRef],
      [DialogConfig, config],
    ]);
    return new PortalInjector(this.injector, injectionTokens);
  }

  private createComponentPortal<T, D, R>(
    componentRef: ComponentType<T>,
    config: DialogConfig<D>,
    dialogRef: DialogRef<T, R>
  ): ComponentPortal<T> {
    const injector = this.createComponentInjector(config, dialogRef);
    const componentPortal = new ComponentPortal(componentRef, null, injector);
    return componentPortal;
  }

  private createComponentInjector<T, D, R>(
    config: DialogConfig<D>,
    dialogRef: DialogRef<T, R>
  ): PortalInjector {
    const injectionTokens = new WeakMap<any, any>([
      [DialogRef, dialogRef],
      [DIALOG_DATA, config.data],
    ]);
    return new PortalInjector(this.injector, injectionTokens);
  }

  private getPositionLeft(): ConnectionPositionPair[] {
    return [
      {
        originX: 'end',
        originY: 'center',
        overlayX: 'start',
        overlayY: 'center'
      }
    ];
  }

  private getPositionBot(): ConnectionPositionPair[] {
    return [
      {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top'
      }
    ];
  }
}
