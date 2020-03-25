import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {MetaService} from '@ngx-meta/core';
import {BehaviorSubject, from} from 'rxjs';
import {concatMap, map, mergeMap, reduce, switchMap} from 'rxjs/operators';
import {RecognizeApiService} from '../../services/recognize.api.service';

@Component({
    selector: 'app-root',
    styleUrls: ['app.style.less'],
    templateUrl: 'app.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
    readonly chords$ = new BehaviorSubject(null);

    constructor(private readonly meta: MetaService,
                private recognizer: RecognizeApiService) {

    }

    ngOnInit(): void {
        this.meta.setTag('og:title', 'Awesome chords recognizer');
        this.meta.setTag('description', 'Awesome chords recognizer -- recognize every note!');
    }

    onUpload(files: File[]) {
        this.chords$.next(null);

        from(files).pipe(
            concatMap(file => this.recognizer.recognize(file)),
            reduce((acc, response) => [...acc, response.chord], []),
        ).subscribe(chords => {
            this.chords$.next(chords);
        });
    }

    onRecorded(blob: Blob) {
        this.onUpload([new File([blob], 'record.wav')]);
    }
}
