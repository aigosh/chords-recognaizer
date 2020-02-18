import {
    Directive,
    EventEmitter,
    HostListener,
    Output,
} from '@angular/core';
import {isNil} from '../../utils/util';

@Directive({
    selector: '[dropZone]',
    exportAs: 'dropZone',
})
export class DropZoneDirective {
    active = false;

    @Output() dropZoneUpload = new EventEmitter<File[]>();
    @Output() dropZoneActiveChange = new EventEmitter<boolean>();

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
        this.toggleActive(true);
    }

    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent) {
        const {files} = event.dataTransfer;

        this.preventDefault(event);
        this.toggleActive(false);
        this.uploadFiles(Array.from(files));
    }

    private uploadFiles(files: File[]) {
        this.dropZoneUpload.emit(files);
    }

    private preventDefault(event: Event) {
        event.preventDefault();
        event.stopPropagation();
    }

    private toggleActive(active?: boolean) {
        if (isNil(active)) {
            active = !this.active;
        }

        this.active = active;
        this.dropZoneActiveChange.emit(active);
    }
}