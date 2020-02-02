import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostListener,
    OnInit,
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

    showDropzone = false;

    constructor(private readonly cd: ChangeDetectorRef) {
    }

    @HostListener('dragenter', ['$event'])
    onDragEnter(event: Event) {
        this.preventDefault(event);
        this.toggleActive(true);
    }

    @HostListener('dragleave', ['$event'])
    onDragLeave(event: Event) {
        this.preventDefault(event);
        this.toggleActive(false);
    }

    @HostListener('dragover', ['$event'])
    onDragOver(event: Event) {
        this.preventDefault(event);
    }

    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent) {
        const {files} = event.dataTransfer;

        this.preventDefault(event);
        this.toggleActive(false);
        this.uploadFiles(Array.from(files));
    }

    onSelectFiles({target}: Event) {
        const {files} = target as HTMLInputElement;

        this.uploadFiles(Array.from(files))
    }

    private uploadFiles(files: File[]) {
        this.upload.emit(files);
    }

    private preventDefault(event: Event) {
        event.preventDefault();
        event.stopPropagation();
    }

    private toggleActive(show?: boolean) {
        if (typeof show !== 'boolean') {
            show = !this.showDropzone;
        }

        this.showDropzone = show;
        this.cd.markForCheck();
    }
}