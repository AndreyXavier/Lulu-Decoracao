import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EditdestinoPageRoutingModule } from './editdestino-routing.module';
import { EditdestinoPage } from './editdestino.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditdestinoPageRoutingModule
  ],
  declarations: [EditdestinoPage]
})
export class EditdestinoPageModule {}
