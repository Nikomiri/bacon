import { Component } from "@angular/core";
import {
  UploadEvent,
  UploadFile,
  FileSystemDirectoryEntry,
  FileSystemEntry,
  FileSystemFileEntry
} from "ngx-file-drop";
import { UploadService } from "./services/upload.service";
import { Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "bacon";

  constructor(private uploadService: UploadService) {}
  public columnsToDisplay: String[] = ["name"];
  public files: UploadFile[] = [];

  public fileDropped(event: UploadEvent) {
    const url = "/upload";
    this.files = event.files;

    for (const file of event.files) {
      const fileEntry = file.fileEntry as FileSystemFileEntry;
      if (fileEntry.isFile) {
        fileEntry.file((file: File) => {
          let request: Observable<HttpEvent<{}>> = this.uploadService.uploadFile(url, file);
          request.toPromise().then(result => {
            console.log(result);
          })
        });
      }
    }
  }
}
