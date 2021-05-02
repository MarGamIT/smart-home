import { Component, OnInit } from '@angular/core';
import { Activity } from '../../../../../library/models/activity.model';
import { User } from '../../../../../library/models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  // deletes table
  public async resetTable(table: string): Promise<boolean> {
    let isDeleted: boolean = false;

    await this.http.delete('http://localhost:3000/table/' + table).toPromise().then(async (response: any) => {
      isDeleted = true;
    });

    return isDeleted;
  }

  // deletes database
  public async resetDatabaseAsync(): Promise<boolean> {
    let isDeleted: boolean = false;

    await this.http.delete('http://localhost:3000/database').toPromise().then(async (response: any) => {
      isDeleted = true;
    });

    return isDeleted;
  }
}
