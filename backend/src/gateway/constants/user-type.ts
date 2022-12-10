import { Socket } from 'socket.io';
import { User } from '../../user/schemas/user.schema';
export type SocketUser = Socket & { user: User };
