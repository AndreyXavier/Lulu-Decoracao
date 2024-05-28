import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabcadastroPageRoutingModule } from './tabcadastro-routing.module';
import { TabcadastroPage } from './tabcadastro.page';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabcadastroPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [TabcadastroPage]
})
export class TabcadastroPageModule {}
