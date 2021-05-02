import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';
import { LoginService } from 'src/app/services/login.service';
import { Activity } from '../../../../../library/models/activity.model';
import { LogMessage } from '../../../../../library/models/logMessage.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  public history: LogMessage[] | null = null;

  constructor(public historyService: HistoryService, public loginService: LoginService) {
  }

  async ngOnInit(): Promise<void> {
    this.history = await this.historyService.getHistoryAsync();
  }
}
