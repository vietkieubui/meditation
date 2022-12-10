import { Server } from 'socket.io';

export interface SetServer {
  setServer(server: Server): void;
}
