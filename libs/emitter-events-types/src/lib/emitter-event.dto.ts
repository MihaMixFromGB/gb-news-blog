import { EmitterEvent } from './emitter-event.interface';
import { EmitterEventType } from './emitter-event-type';
import { SocketEventPayload } from '@gb-news-blog/socket-events-types';

export class EmitterEventDto implements EmitterEvent {
  constructor(
    public type: EmitterEventType,
    public roomId: string,
    public payload: SocketEventPayload
  ) {}
}
