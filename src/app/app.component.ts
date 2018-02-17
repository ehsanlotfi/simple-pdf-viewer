import { Component, ViewChild } from '@angular/core';
import { SimplePdfViewerComponent } from '../../libs/simple-pdf-viewer/src/simplePdfViewer.component';
import { SimpleProgressData, SimplePDFBookmark } from '../../libs/simple-pdf-viewer/src/simplePdfViewer.models';

const OUTLINE_MENU = 2;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  src: string = 'assets/example/pdf-test.pdf';
  menu = 1;
  backButtonVisible = false;
  errorMsg = '';
  bookmarks: SimplePDFBookmark[] = [];

  firstPageBox: any;
  firstZoomBox: any;
  pageBox: any;
  zoomBox: any;
  searchBox: any;

  @ViewChild(SimplePdfViewerComponent) private pdfViewer: SimplePdfViewerComponent;

  isActiveMenu(menu: number): boolean {
    return this.menu === menu && (this.pdfViewer.isDocumentLoaded() || menu === 1);
  }

  setActiveMenu(menu: number) {
    this.menu = menu;
    if(menu == OUTLINE_MENU) {
      this.backButtonVisible = true;
    } else {
      this.backButtonVisible =false;
    }
  }

  openDocument(documents: File[]) {
    this.errorMsg = '';
    if (documents && documents.length > 0) {
      const fileReader: FileReader = new FileReader();
      fileReader.onload = () => {
        this.pdfViewer.openDocument(new Uint8Array(fileReader.result));
      };
      fileReader.readAsArrayBuffer(documents[0]);
    }
  }

  onError(event: any) {
    this.errorMsg = 'Failed to load the document';
  }

  onProgress(progress: SimpleProgressData) {
    console.log(progress);
  }

  onLoadComplete()  {
    console.log('Document is loaded');
    // see the whole document
    this.pdfViewer.zoomFullPage();
  }

  createBookmark() {
    this.pdfViewer.createBookmark().then(bookmark => {
      if(bookmark) {
        this.bookmarks.push(bookmark);
      }
    })
  }

}
