import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {MetaService} from '@ngx-meta/core';
import {from} from 'rxjs';
import {mergeMap, switchMap} from 'rxjs/operators';
import {RecognizeApiService} from '../../services/recognize.api.service';

@Component({
    selector: 'app-root',
    styleUrls: ["app.style.less"],
    templateUrl: "app.template.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
    constructor(private readonly meta: MetaService,
                private recognizer: RecognizeApiService) {

    }

    ngOnInit(): void {
        this.meta.setTag('og:title', 'Awesome chords recognizer');
        this.meta.setTag('description', 'Awesome chords recognizer -- recognize every note!');
    }

    onUpload(files: File[]) {
        from(files).pipe(mergeMap(file => this.recognizer.recognize(file))).subscribe(() => console.log('success!'))
    }

    onRecorded(blob: Blob) {
        this.onUpload([new File([blob], 'record.wav')])
    }
}
