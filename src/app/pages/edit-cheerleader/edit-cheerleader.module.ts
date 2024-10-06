import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCheerleaderPageRoutingModule } from './edit-cheerleader-routing.module';

import { EditCheerleaderPage } from './edit-cheerleader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCheerleaderPageRoutingModule
  ],
  declarations: [EditCheerleaderPage]
})
export class EditCheerleaderPageModule {}
