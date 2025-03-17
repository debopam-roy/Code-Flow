import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Privacy, Status, CreateRoomDto, JoinRoomDto } from '../dto/room.dto';
import { RedisService } from 'src/util/redis.service';

@Injectable()
export class RoomService {
  constructor(private readonly redisService: RedisService) {}

  async saveUser(userId: number, userName: string, clientId: string) {
    const userKey = `ActiveUser:${clientId}`;
    const user = { userId, userName };
    await this.redisService.setWithExpiry(userKey, JSON.stringify(user), 3600);
  }

  async removeUser(clientId: string) {
    const userKey = `ActiveUser:${clientId}`;
    await this.redisService.delete(userKey);
  }

  async createRoom(payload: CreateRoomDto) {
    const roomKey = `active_room:${payload.roomId}`;

    if (await this.redisService.exists(roomKey)) {
      return {
        success: false,
        message: 'Room with the same ID already exists.',
      };
    }

    let passwordHash = null;
    if (payload.roomPrivacy !== Privacy.Public) {
      passwordHash = await bcrypt.hash(payload.roomPassword, 10);
    }

    const newRoom = {
      roomId: payload.roomId,
      roomName: payload.roomName || 'New CodeFlow Meeting Room',
      password: passwordHash,
      metadata: {
        framework: payload.projectType,
        ownerId: payload.userId,
        activeUsers: 0,
        status: Status.CREATED,
        privacy: Privacy[payload.roomPrivacy],
        description: payload.roomDescription || '',
        guidelines: payload.roomGuidelines || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    await this.redisService.setWithExpiry(
      roomKey,
      JSON.stringify(newRoom),
      3600 * 24,
    );
    return {
      success: true,
      message: 'Room created successfully.',
      room: newRoom,
    };
  }

  async getRoomDetails(roomId: string): Promise<any> {
    try {
      const roomKey = `active_room:${roomId}`;
      const roomDetails = await this.redisService.get(roomKey);
      if (!roomDetails) {
        throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
      }
      return JSON.parse(roomDetails);
    } catch (error) {
      throw new HttpException(
        'Error fetching room details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async activateRoom(roomId: string, roomDetails: any): Promise<void> {
    try {
      roomDetails.metadata.status = 'active';
      roomDetails.metadata.activeUsers = 1;
      await this.redisService.setWithExpiry(
        `active_room:${roomId}`,
        JSON.stringify(roomDetails),
        3600 * 24,
      );
    } catch (error) {
      throw new HttpException(
        'Error activating room',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async incrementUsers(roomId: string, roomDetails: any): Promise<void> {
    try {
      roomDetails.metadata.activeUsers =
        (roomDetails.metadata.activeUsers || 0) + 1;
      await this.redisService.setWithExpiry(
        `active_room:${roomId}`,
        JSON.stringify(roomDetails),
        3600 * 24,
      );
    } catch (error) {
      throw new HttpException(
        'Error updating user count',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
