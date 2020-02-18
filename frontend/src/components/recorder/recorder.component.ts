import {
    ChangeDetectionStrategy,
    Component,
} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {isNil} from '../../utils/util';

@Component({
    selector: 'recorder',
    styleUrls: ['recorder.style.less'],
    templateUrl: 'recorder.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RecorderComponent {
    recording: boolean = false;

    private recordedChunks = [];
    private mediaRecorder: MediaRecorder = null;

    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon(
            'stop',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icon/stop.svg'));
        iconRegistry.addSvgIcon(
            'play_arrow',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icon/play_arrow.svg'));
    }

    record() {
        if (this.recording) {
            return;
        }

        this.recording = true;

        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then(this.handleRecord.bind(this));
    }

    stop() {
        if (!this.recording) {
            return;
        }

        this.mediaRecorder.stop();
        this.recording = false;
    }

    private handleRecord(stream: MediaStream) {
        const options = {mimeType: 'audio/webm'};
        this.mediaRecorder = new MediaRecorder(stream, options);

        this.mediaRecorder.addEventListener('dataavailable', (event: any) => {
            if (event.data.size > 0) {
                this.recordedChunks.push(event.data);
            }
        });

        this.mediaRecorder.addEventListener('stop', () => {
            console.log(new File([new Blob(this.recordedChunks)], 'record.wav'));
        });

        this.mediaRecorder.start();
    }

}