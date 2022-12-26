import {
  WebSocketServer,
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import { CommentDto } from '@gb-news-blog/dto';

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

  @SubscribeMessage('joinRoom')
  handleJoinRoomClient(
    @MessageBody() { newsId }: JoinData,
    @ConnectedSocket() client: Socket
  ) {
    client.join(newsId);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoomClient(
    @MessageBody() { newsId }: JoinData,
    @ConnectedSocket() client: Socket
  ) {
    client.leave(newsId);
  }

  @SubscribeMessage('createComment (client)')
  handleCreateComment(
    @MessageBody() { data }: CreateCommentData,
    @ConnectedSocket() client: Socket
  ): void {
    const room = data.newsId.toString();
    client.to(room).emit('createComment (server)', data);
  }
}
