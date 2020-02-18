import {NgModule} from '@angular/core';

import {RecorderComponent} from './recorder.component';
import {MatButtonModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
    ],
    exports: [
        RecorderComponent,
    ],
    declarations: [RecorderComponent],
    providers: [],
})
export class RecorderModule {
}
