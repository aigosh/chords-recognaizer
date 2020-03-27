import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, EventEmitter, Inject, Output,
} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {isNil} from '../../utils/util';
import Recorder from 'recorder-js';
import {DOCUMENT} from '@angular/common';

@Component({
    selector: 'recorder',
    styleUrls: ['recorder.style.less'],
    templateUrl: 'recorder.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecorderComponent {
    @Output() recorded = new EventEmitter<Blob>();

    recording: boolean = false;

    private mediaRecorder: Recorder = null;

    constructor(@Inject(DOCUMENT) private document: Document,
                private cd: ChangeDetectorRef,
                iconRegistry: MatIconRegistry,
                sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon(
            'stop',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icon/stop.svg'));
        iconRegistry.addSvgIcon(
            'play_arrow',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icon/play_arrow.svg'));
    }

    get window(): Window {
        return this.document.defaultView;
    }

    record() {
        if (this.recording) {
            return;
        }

        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then(this.handleRecord.bind(this));
    }

    stop() {
        if (!this.recording) {
            return;
        }

        this.mediaRecorder.stop().then(({blob}) => {
            this.recording = false;
            this.cd.markForCheck();
            this.recorded.emit(blob);
        });
    }

    private handleRecord(stream: MediaStream) {
        const AudioContext = this.window['AudioContext'] || this.window['webkitAudioContext'];
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);

        this.mediaRecorder = new Recorder(source.context, {
            numChannels: 1
        });
        this.mediaRecorder.init(stream);
        this.mediaRecorder.start().then(() => {
            this.recording = true;
            this.cd.markForCheck();
        }, () => {
            this.recording = false;
            this.cd.markForCheck();
        });
    }

}
