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
import {RecorderModule} from '../../components/recorder/recorder.module';
import {DropZoneModule} from '../../directives/dropZone/dropZone.module';
import {RecognizeApiService} from '../../services/recognize.api.service';
import {TranslateService} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';

export function initLanguage(translateService: TranslatesService): Function {
    return (): Promise<any> => translateService.initLanguage();
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule.withServerTransition({appId: 'my-app'}),
        TransferHttpCacheModule,
        HttpClientModule,
        FileUploaderModule,
        DropZoneModule,
        RecorderModule,
        RouterModule,
        BrowserAnimationsModule,
        CookieModule.forRoot(),
        SharedModule.forRoot(),
    ],
    declarations: [AppComponent],
    providers: [
        CookieService,
        UniversalStorage,
        RecognizeApiService,
        {provide: APP_INITIALIZER, useFactory: initLanguage, multi: true, deps: [TranslatesService]},
    ],
})
export class AppModule {
}
