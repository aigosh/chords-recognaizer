// import {
//     ChangeDetectionStrategy,
//     Component, EventEmitter, Inject, Output,
// } from '@angular/core';
// import {MatIconRegistry} from '@angular/material';
// import {DomSanitizer} from '@angular/platform-browser';
// import {isNil} from '../../utils/util';
// import * as Recorder from 'recorderjs';
// import {DOCUMENT} from '@angular/common';
//
// @Component({
//     selector: 'recorder',
//     styleUrls: ['recorder.style.less'],
//     templateUrl: 'recorder.template.html',
//     changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class RecorderComponent {
//     @Output() recorded = new EventEmitter<Blob>();
//
//     recording: boolean = false;
//
//     private mediaRecorder: Recorder = null;
//
//     constructor(@Inject(DOCUMENT) private document: Document, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
//         iconRegistry.addSvgIcon(
//             'stop',
//             sanitizer.bypassSecurityTrustResourceUrl('assets/icon/stop.svg'));
//         iconRegistry.addSvgIcon(
//             'play_arrow',
//             sanitizer.bypassSecurityTrustResourceUrl('assets/icon/play_arrow.svg'));
//     }
//
//     get window(): Window {
//         return this.document.defaultView;
//     }
//
//     record() {
//         if (this.recording) {
//             return;
//         }
//
//         this.recording = true;
//
//         navigator.mediaDevices.getUserMedia({ audio: true, video: false })
//             .then(this.handleRecord.bind(this));
//     }
//
//     stop() {
//         if (!this.recording) {
//             return;
//         }
//
//         this.mediaRecorder.stop();
//         this.recording = false;
//         this.mediaRecorder.exportWAV((blob) => {
//             this.recorded.emit(blob);
//         });
//
//     }
//
//     private handleRecord(stream: MediaStream) {
//         const AudioContext = this.window['AudioContext'] || this.window['webkitAudioContext'];
//         const audioContext = new AudioContext();
//         const source = audioContext.createMediaStreamSource(stream);
//
//         this.mediaRecorder = new Recorder(source, {
//             numChannels: 1
//         });
//         this.mediaRecorder.record();
//     }
//
// }
