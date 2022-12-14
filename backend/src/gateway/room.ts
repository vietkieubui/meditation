export enum RoomType {
  User = 'User',
  Message = 'Message',
  Conversation = 'Conversation',
}

export const getRoomId = (type: `${RoomType}`, id: string): string =>
  `${type}/${id}`;
