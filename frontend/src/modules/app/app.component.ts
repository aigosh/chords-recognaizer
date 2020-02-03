import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {MetaService} from '@ngx-meta/core';

@Component({
    selector: 'app-root',
    styleUrls: ["app.style.less"],
    templateUrl: "app.template.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
    constructor(private readonly meta: MetaService) {

    }

    ngOnInit(): void {
        this.meta.setTag('og:title', 'Awesome chords recognizer');
        this.meta.setTag('description', 'Awesome chords recognizer -- recognize every note!');
    }

    onUpload(files: File[]) {
        console.log(files);
    }
}
