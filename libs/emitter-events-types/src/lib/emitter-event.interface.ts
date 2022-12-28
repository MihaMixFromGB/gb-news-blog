import { EmitterEventType } from './emitter-event-type';
import { SocketEventPayload } from '@gb-news-blog/socket-events-types';

export interface EmitterEvent {
  type: EmitterEventType;
  roomId: string;
  payload: SocketEventPayload;
}
