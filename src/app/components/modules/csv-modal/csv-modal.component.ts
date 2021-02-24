import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import * as XLSX from 'xlsx';
import { DatatransferService } from '../../services/datatransfer.service';
type AOA = any[][];

@Component({
  selector: 'app-csv-modal',
  templateUrl: './csv-modal.component.html',
  styleUrls: ['./csv-modal.component.scss']
})
export class CsvModalComponent implements OnInit {
  public files: any[] = [];
  csvAsText: any;
  delimiters = ['Comma'];
  mergeDis=['Merge']
  data: any;
  headers: any;
  showDelimitorPick = false;
  selectedDelimiter = 'Comma';
  selectedmergeDis = 'Merge';

  newEve: any;
  excel: any;
  file: File;
  arrayBuffer: any;
  filelist: any;
  isMerge = false;
  @ViewChild('inputFile') inputFile: ElementRef;
  constructor(private _snackBar: MatSnackBar, public dialog: MatDialogRef<CsvModalComponent>) { }

  ngOnInit() {
  }
  //FIle change function
  async onFileChange(pFileList) {
    this.newEve = pFileList
    this.files = Object.keys(pFileList).map(key => pFileList[key]);
    this.file = pFileList[0];
    this.showDelimitorPick = true;
    this._snackBar.open("Successfully upload!", 'Close', {
      duration: 2000,
    });
  }
  //Modal popup close function
  close() {
    this.dialog.close()
  }
  //For submit action After Selected file
  async submit() {
    if (this.files.every(file => file.type === 'text/csv')) {
      this.csvAsText = await this.files[0].text();
      let delimit = this.selectedDelimiter === 'Comma' ? '\\B' : this.selectedDelimiter === 'Tab' ? '\\t' : ';';
      let reglrExp = new RegExp(`(?!${delimit}\"[^\"]*),(?![^\"]*\"${delimit})`);
      this.headers = JSON.parse(JSON.stringify(this.csvAsText.split(/\n|\r/)[0].split(reglrExp).map(colval => colval.replace(/\"/g, ''))));
      this.data = JSON.parse(JSON.stringify(this.csvAsText.split(/\n|\r/).filter((val, i) => i !== 0 && val[0]).map((colmn: string) => {
        let colObj = {};
        colmn.split(reglrExp).map(colval => colval.replace(/\"/g, '')).forEach((colval, i) => {
          if (this.headers[i]) {
            colObj[this.headers[i]] = colval;
          }
        })
        return colObj;
      })));
      // console.log(this.data);
      this.dialog.close({ data: this.data.map(row => Object.values(row)), headers: this.headers, isMerge: this.isMerge });
    } else {
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(this.file);
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        let data = new Uint8Array(this.arrayBuffer);
        let arr = new Array();
        for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        let bstr = arr.join("");
        let workbook = XLSX.read(bstr, { type: "binary", cellDates: true, cellNF: false, cellText: false });
        let first_sheet_name = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[first_sheet_name];
        // console.log(XLSX.utils.sheet_to_json(worksheet, { raw: false }));
        let arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: false });
        // console.log(arraylist)
        this.headers = [];
        arraylist.forEach(row => {
          Object.keys(row).forEach((head, i) => {
            if (!this.headers.includes(head)) {
              this.headers.push(head);
            }
          })
        });
        this.dialog.close({ data: arraylist.map(row => this.headers.map(head => row[head] || '')), headers: this.headers, isMerge: this.isMerge });
        this.filelist = [];

      }
    }
  }


}
