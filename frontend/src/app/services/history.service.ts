import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { LogMessage } from '../../../../library/models/logMessage.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  // Get 
  public async getHistoryAsync(): Promise<LogMessage[]> {
    let logMessages: LogMessage[] = [];

    await this.http.get<LogMessage[]>('http://localhost:3000/history/').toPromise().then((response) => {
      logMessages = response;
    }).catch((error) => this.messageService.add({ key: 'requestLogHistoryError', severity: 'error', summary: 'Error', detail: 'Listing log messages not possible' }));

    return logMessages;
  }

  // creates logMessage
  public async createLogMessageAsync(logMessageData: LogMessage): Promise<LogMessage | null> {
    let logMessage: LogMessage | null = null;

    await this.http.post('http://localhost:3000/history', logMessageData).toPromise().then((response: any) => {
      this.messageService.add({ key: 'logMessageCreationSuccess', severity: 'success', summary: 'Success', detail: 'Log message creation was successful' });
      logMessage = response;
    }).catch((error) => this.messageService.add({ key: 'logMessageCreationError', severity: 'error', summary: 'Error', detail: 'Log message creation not possible' }));

    return logMessage;
  }
}
