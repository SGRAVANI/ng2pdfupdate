import { AfterViewInit, Component ,OnInit,ViewChild,ElementRef} from '@angular/core';
import { PdfJsViewerComponent } from 'ng2-pdfjs-viewer';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.css']
})
export class Demo1Component implements OnInit,AfterViewInit {
  //@ViewChild('pdfViewer', { static: false }) pdfViewer!: PdfJsViewerComponent;
  // @ViewChild('pdfViewer') pdfViewer!: PdfJsViewerComponent;
  // @ViewChild('pdfViewer', { read: ElementRef }) pdfViewerRef!: ElementRef; // To access the iframe element directly
  //@ViewChild('pdfIframe') pdfIframe!: ElementRef;
  @ViewChild('pdfViewer') pdfViewer!: PdfJsViewerComponent;
  pdfSrc = 'cy.pdf';
  showViewerSpinner = true;

  isDocumentLoaded = false;
  ngOnInit() {
    // Listen for the document load event to set the flag
    // Assuming ng2-pdfjs-viewer emits 'onDocumentLoad' after the PDF is loaded
    // this.pdfViewer.onDocumentLoad.subscribe(() => {
    //   this.isDocumentLoaded = true;
    //   console.log('PDF document loaded.');
    //   this.showViewerSpinner = true;
    // });
  }
  ngAfterViewInit(): void {
    // const iframeElement = this.pdfViewerRef.nativeElement.querySelector('iframe');
    // if (iframeElement) {
    //   iframeElement.onload = () => {
    //     this.isDocumentLoaded = true;
    //     console.log('Iframe loaded with PDF content.');
    //   };
    // }
    // if (this.pdfIframe) {
    //   const iframe = this.pdfIframe.nativeElement as HTMLIFrameElement;
    //   iframe.onload = () => {
    //     console.log('PDF iframe loaded');
    //   };
    // }
  }


  handleBeforePrint() {
    // console.log('Before print event received.');
    // if (this.isDocumentLoaded && this.pdfViewer && this.pdfViewer.iframe && this.pdfViewer.iframe.nativeElement.contentWindow) {
    //   const iframeWindow = this.pdfViewer.iframe.nativeElement.contentWindow;

    //   // Attempt to force a re-render or ensure focus on the content
    //   if (iframeWindow.PDFViewerApplication && iframeWindow.PDFViewerApplication.forceRendering) {
    //     console.log('Attempting to force PDF.js rendering.');
    //     iframeWindow.PDFViewerApplication.forceRendering();
    //   } else if (iframeWindow.focus) {
    //     console.log('Focusing on the iframe content.');
    //     iframeWindow.focus();
    //   }

    //   // Introduce a longer delay and check iframe ready state
    //   setTimeout(() => {
    //     if (iframeWindow.document.readyState === 'complete') {
    //       console.log('Iframe document is complete, attempting to print.');
    //       if (iframeWindow.PDFViewerApplication && iframeWindow.PDFViewerApplication.print) {
    //         iframeWindow.PDFViewerApplication.print();
    //       } else {
    //         console.warn('PDF.js print not available, falling back to window.print on iframe.');
    //         iframeWindow.print();
    //       }
    //     } else {
    //       console.warn('Iframe document not fully ready after delay.');
    //       // Optionally, you could try printing again after another small delay
    //     }
    //   }, 2000); // Increased delay to 2 seconds (adjust as needed)

    // } else {
    //   console.warn('Print initiated before document loaded or iframe not ready.');
    // }
  }
  triggerMobilePrint() {
    console.log('Print button clicked.');
    // if (this.isDocumentLoaded && this.pdfViewer && this.pdfViewer.iframe && this.pdfViewer.iframe.nativeElement.contentWindow) {
    //   // Introduce a small delay after iframe load
    //   setTimeout(() => {
    //     console.log('Attempting to print from iframe contentWindow.');
    //     this.pdfViewer.iframe.nativeElement.contentWindow.print();
    //   }, 500); // Adjust delay if needed
    // } else {
    //   console.warn('Print triggered before iframe loaded or iframe not ready.');
    //   // Optionally provide user feedback
    // }
  }
  handleDocumentLoad(event: any) {
    this.isDocumentLoaded = true;
    console.log('PDF document loaded:', event);
  }

  triggerPrint() {
    console.log("trugger print called")
    if (this.isMobile()) {
      if (this.isDocumentLoaded) {
        const pdfUrl = window.location.origin + '/assets/cy.pdf'; // Construct the full URL
        setTimeout(() => {
          window.open(pdfUrl, '_blank');
        }, 500);
      } else {
        console.warn('Print triggered before document loaded for mobile.');
      }
    } else {
      // Desktop print logic (remains the same)
      if (this.pdfViewer && this.pdfViewer.iframe && this.pdfViewer.iframe.nativeElement.contentWindow) {
        const iframeWindow = this.pdfViewer.iframe.nativeElement.contentWindow;
        setTimeout(() => {
          iframeWindow.focus();
          iframeWindow.print();
        }, 1000);
      } else {
        console.warn('Could not access iframe for printing on desktop.');
      }
    }
  }

  isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }
}
