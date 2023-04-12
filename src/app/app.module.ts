import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PresentationModule } from './presentation/presentation.module';
import { DataModule } from './data/data.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageInterceptor } from './infrastructure/language.interceptor';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [AppComponent],
  imports: [
    
    MaterialModule,
    BrowserModule,
    DataModule,
    HttpClientModule,
    PresentationModule,
    InfrastructureModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:LanguageInterceptor,
      multi:true
    },
    HttpClient
  ],
  
  bootstrap: [AppComponent],
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
