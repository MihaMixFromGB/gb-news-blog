import {
  WebSocketServer,
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { OnEvent } from '@nestjs/event-emitter';
import { Socket, Server } from 'socket.io';

import { CommentDto } from '@gb-news-blog/dto';
import { EmitterEvent } from '@gb-news-blog/emitter-events-types';

export interface JoinData {
  newsId: string;
}

export interface CreateCommentData {
  data: CommentDto;
}

export interface EditCommentData {
  commentId: number;
  data: CommentDto;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketCommentsGateway {
  @WebSocketServer() private server: Server;

  @SubscribeMessage('room-join')
  handleJoinRoomClient(
    @MessageBody() { newsId }: JoinData,
    @ConnectedSocket() client: Socket
  ) {
    client.join(newsId);
  }

  @SubscribeMessage('room-leave')
  handleLeaveRoomClient(
    @MessageBody() { newsId }: JoinData,
    @ConnectedSocket() client: Socket
  ) {
    client.leave(newsId);
  }

  // @SubscribeMessage('comment-create')
  // handleCreateComment(
  //   @MessageBody() { data }: CreateCommentData,
  //   @ConnectedSocket() client: Socket
  // ): void {
  //   const room = data.newsId.toString();
  // //  broadcast to a room from a given socket (client) excluding the sender
  //   client.to(room).emit('comment-create', data);
  // }

  @OnEvent('comment.*')
  handleCommentEvents({ type, roomId, payload }: EmitterEvent) {
    this.server.to(roomId).emit(type, payload);
  }
}
