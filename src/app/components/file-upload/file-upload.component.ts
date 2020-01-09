import {Component, OnInit} from '@angular/core';
import {ChartService} from '../../services/chart.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  file: File;

  constructor(private chartService: ChartService) {
  }

  ngOnInit() {
  }

  fileChange(event) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.chartService.currentChat = reader.result as string;
    };
    reader.readAsText(this.file);
  }

  removeFile() {
    this.file = null;
    this.chartService.currentChat = '';
  }
}
