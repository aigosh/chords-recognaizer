import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Output,
} from '@angular/core';

@Component({
    selector: 'file-uploader',
    styleUrls: ['fileUploader.style.less'],
    templateUrl: 'fileUploader.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FileUploaderComponent {
    @Output() upload = new EventEmitter<File[]>();

    constructor(private readonly cd: ChangeDetectorRef) {
    }

    onSelectFiles({target}: Event) {
        const {files} = target as HTMLInputElement;

        this.uploadFiles(Array.from(files))
    }

    private uploadFiles(files: File[]) {
        this.upload.emit(files);
    }
}