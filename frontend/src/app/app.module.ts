import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {AppComponent} from './app.component';
import {NavBarComponent} from './navbar/navbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './home/home.component';
import {WineCardComponent} from './wine-card/wine-card.component';
import {AppRoutingModule} from './app-routing.module';
import {AppMaterialModule} from './app-material.module';
import {HttpClientModule} from '@angular/common/http';
import {WineService} from './wine/wine.service';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    WineCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CdkTableModule,
    CdkTreeModule,
    AppMaterialModule,
    HttpClientModule
  ],
  providers: [WineService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
