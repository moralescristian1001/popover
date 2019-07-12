import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopoverComponent } from './popover/popover.component';
import { ContentComponent } from './content/content.component';
import {DialogService} from './popover/shared/overlay.service';

@NgModule({
  declarations: [
    AppComponent,
    PopoverComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    CommonModule,
    PortalModule,
    OverlayModule
  ],
  entryComponents: [PopoverComponent, ContentComponent],
  providers: [DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
