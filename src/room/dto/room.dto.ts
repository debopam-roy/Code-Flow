export enum Status {
  CREATED = 'created',
  ACTIVE = 'active',
  CLOSED = 'closed',
}

export enum Privacy {
  Protected = 'Protected',
  Private = 'Private',
  Public = 'Public',
}

export interface CreateRoomDto {
  
  roomId: string;
  roomName?: string;
  userId: string;
  roomPrivacy: Privacy;
  projectType: string;
  roomPassword?: string;
  roomDescription?: string;
  roomGuidelines?: string[];
}

export interface JoinRoomDto {
  roomId: string;
  userId: string;
  roomPassword?: string;
}
export interface RoomCredentials {
  roomId: string;
  user_id: string;
  user_name: string;
  profile_picture: string;
}

export interface Member {
  socket_id: string;
  user_name: string;
  profile_picture: string;
}

export interface RoomDetails {
  roomName: string;
  owner: string;
  description: string;
  guidelines: string[];
}
