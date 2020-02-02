// angular
import { NgModule } from '@angular/core';
import { BrowserTransferStateModule } from '@angular/platform-browser';
// libs
import { REQUEST } from '@nguniversal/express-engine/tokens';
// shared
import { TranslatesBrowserModule } from '../shared/translates/translates-browser';
// components
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StateTransferInitializerModule } from '@nguniversal/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { ServiceWorkerModule } from '@angular/service-worker';

// the Request object only lives on the server
export function getRequest(): any {
  return { headers: { cookie: document.cookie } };
}

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    AppModule,
    StateTransferInitializerModule,
    BrowserTransferStateModule,
    TranslatesBrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: false }),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      // The server provides these in main.server
      provide: REQUEST,
      useFactory: getRequest,
    },
    { provide: 'ORIGIN_URL', useValue: location.origin },
  ],
})
export class AppBrowserModule {}
