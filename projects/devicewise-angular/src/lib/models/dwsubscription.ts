import * as DwResponse from './dwresponse';
import * as DwRequest from './dwrequest';
import { Observable } from 'rxjs';

export class DwSubscription {
  request: DwRequest.SubscribeRequest;
  response: DwResponse.SubscribeResponse;
  subscription: Observable<DwResponse.SubscribeDataResponse>;

  constructor(device: string, variable: string, type: number, count: number, length: number) {
    this.request = {
      command: 'variable.subscribe',
      params: {
        device: device,
        variable: variable,
        type: type,
        count: count,
        length: length
      }
    };
  }
}
