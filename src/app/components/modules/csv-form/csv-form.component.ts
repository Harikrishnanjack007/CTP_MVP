import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HotTableComponent } from '@handsontable/angular';
import { merge } from 'rxjs';
import { CsvModalComponent } from '../csv-modal/csv-modal.component';

@Component({
  selector: 'app-csv-form',
  templateUrl: './csv-form.component.html',
  styleUrls: ['./csv-form.component.scss']
})
export class CsvFormComponent implements OnInit {
  tableData: any;
  tableSettings = {
    manualColumnResize: true,
    rowHeaders: true,
    manualRowResize: true,
  };
  tableColumns
  newTableHeading: any;
  newValue: any;
  @ViewChild("hot") hot: HotTableComponent;
  dictionary = [{ need: 'Dato', noneed: ['Valutadato', 'Dato'] }, { need: 'Beskrivelse', noneed: ['Beskrivelse', 'Beløpet gjelder'] }];
  
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CsvModalComponent, {
      width: '640px', disableClose: true
    });
    dialogRef.afterClosed().subscribe(val => {
      if (val) this.populateTable(val);
    });
  }


  populateTable(tableValue) {
    if (tableValue && tableValue.isMerge && this.tableSettings['columns'].length !== 0) {
      this.mergeData(tableValue);
    } else {
      this.createTableValues(tableValue)
    }
  }

  createTableValues(tableValues) {
    this.tableData = tableValues.data;
    this.tableSettings['columns'] = this.createHeaders(tableValues.headers)
  }

  mergeData(tableValues) {
    let newHeaders = this.createHeaders(tableValues['headers']);
    let mergedHeader: any = new Set([...newHeaders, ...this.tableSettings['columns']]);
    let mergedHeaders = [];
    mergedHeader.forEach(v => mergedHeaders.push(v));
    let newTabledata = [];
    // saort and arrange old data
    for (let i = 0; i < this.tableData.length; i++) {
      let colData = []
      for (let j = 0; j < this.tableSettings['columns'].length; j++) {
        colData.push({ value: this.tableData[i][j], header: this.tableSettings['columns'][j] })
      }
      newTabledata[i] = colData;
    }
    // sort and arraneg new data
    let oldData = [];
    for (let i = 0; i < tableValues.data.length; i++) {
      let colData = []
      for (let j = 0; j < tableValues.headers.length; j++) {
        colData.push({ value: tableValues.data[i][j], header: tableValues.headers[j] })
      }
      oldData[i] = colData;
    }

    let allDatas = [...oldData, ...newTabledata];

    let finalDataArray = [];
    for (let i = 0; i < allDatas.length; i++) {
      let pushObj = [];
      for (let j = 0; j < allDatas[i].length; j++) {
        let indexOfHeader = mergedHeaders.indexOf(allDatas[i][j]['header']);
        pushObj[indexOfHeader] = allDatas[i][j]['value']
      }
      finalDataArray[i] = pushObj;
    }
    this.tableSettings['columns'] = mergedHeaders;
    for (let i = 0; i < finalDataArray.length; i++) {
      for (let j = 0; j < mergedHeaders.length; j++) {
        if (!finalDataArray[i][j]) {
          finalDataArray[i][j] = '';
        }
      }
    }
    this.tableSettings['columns'] = mergedHeaders
    this.tableData = finalDataArray;
    this.hot.updateHotTable(this.tableSettings);
  }

  createHeaders(inV) {
    let result = inV;
    for (let i = 0; i < inV.length; i++) {
      for (let j = 0; j < this.dictionary.length; j++) {
        if (this.dictionary[j].noneed.includes(inV[i])) {
          result[i] = this.dictionary[j].need;
        }
      }
    }
    return result;
  }

}

