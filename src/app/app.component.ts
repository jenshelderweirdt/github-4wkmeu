import { Component } from '@angular/core';
import { createWorker } from 'tesseract.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tesseract.js-angular-app';
  ocrResult = 'Recognizing...';
  constructor() {
    this.doOCR();
  }
  async doOCR() {
    const worker = createWorker({
      logger: m => console.log(m),
    });
    await worker.load();
    await worker.loadLanguage('nld');
    await worker.initialize('nld');
    const { data: { text } } = await worker.recognize('https://kookidee.nl/wp-content/uploads/2017/10/5-ingredienten-snel-simpel-koken-jamie-oliver-05.jpg');
    this.ocrResult = text;
    console.log(text);
    await worker.terminate();
  }
}
