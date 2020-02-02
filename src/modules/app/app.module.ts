// angular
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// libs
import {CookieService, CookieModule} from '@gorniv/ngx-universal';
import {TransferHttpCacheModule} from '@nguniversal/common';
// shared
import {SharedModule} from '../shared/shared.module';
import {TranslatesService} from '../shared/translates';
// components
import {AppComponent} from './app.component';
import {UniversalStorage} from '../shared/storage/universal.storage';
// interceptors
import {FileUploaderModule} from '../../components/fileUploader/fileUploader.module';

export function initLanguage(translateService: TranslatesService): Function {
    return (): Promise<any> => translateService.initLanguage();
}

@NgModule({
    imports: [
        BrowserModule.withServerTransition({appId: 'my-app'}),
        TransferHttpCacheModule,
        HttpClientModule,
        FileUploaderModule,
        RouterModule,
        BrowserAnimationsModule,
        CookieModule.forRoot(),
        SharedModule.forRoot(),
    ],
    declarations: [AppComponent],
    providers: [
        CookieService,
        UniversalStorage,
        {provide: APP_INITIALIZER, useFactory: initLanguage, multi: true, deps: [TranslatesService]},
    ],
})
export class AppModule {
}
