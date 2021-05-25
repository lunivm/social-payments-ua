import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinancialInstitution } from '../../../../../../api-contracts/financial-institution/financial.institution';
import { MainProgressBarService } from '../../../layout/main-progress-bar/main-progress-bar.service';
import { CachedDataService } from '../../services/cached-data.service';
import { WebsocketConnectionService } from '../../services/websocket-connection/websocket-connection.service';

@Injectable()
export class FinancialInstitutionService extends CachedDataService<FinancialInstitution> {
  protected readonly requestUrl = '/financial-institutions';
  protected readonly websocketChannel = 'financial-institution';
  protected readonly mainProgressBarItemCaption = 'Фінансові установи';

  constructor(
    http: HttpClient,
    mainProgressBarService: MainProgressBarService,
    websocketConnectionService: WebsocketConnectionService
  ) {
    super(http, mainProgressBarService, websocketConnectionService);
  }
}
