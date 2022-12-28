import { Test, TestingModule } from '@nestjs/testing';
import { SocketCommentsGateway } from './socket-comments.gateway';

describe('SocketCommentsGateway', () => {
  let gateway: SocketCommentsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketCommentsGateway],
    }).compile();

    gateway = module.get<SocketCommentsGateway>(SocketCommentsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
