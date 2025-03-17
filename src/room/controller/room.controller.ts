import {
  Controller,
  Get,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from '../service/room.service';
import { CreateRoomDto, JoinRoomDto, RoomDetails } from '../dto/room.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/services/auth.service';

@Controller('room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly authService: AuthService,
  ) {}

  @Post('create_room')
  @UseGuards(AuthGuard)
  async handleCreateRoom(@Body() payload: CreateRoomDto) {
    try {
      const result = await this.roomService.createRoom(payload);

      return result;
    } catch (error) {
      console.error('Error creating room:', error);
      return { success: false, message: 'Failed to create room.' };
    }
  }

  @Post('join_room')
  async handleJoinRoom(@Body() payload: JoinRoomDto) {
    const { roomId, userId, roomPassword } = payload;

    try {
      // Fetch room details
      const roomDetails = await this.roomService.getRoomDetails(roomId);

      if (!roomDetails) {
        throw new HttpException('Room does not exist', HttpStatus.NOT_FOUND);
      }
      if (
        roomDetails.metadata.privacy !== 'Public' &&
        roomPassword !== undefined
      ) {
        const isPasswordValid = await bcrypt.compare(
          roomPassword,
          roomDetails.password,
        );

        if (!isPasswordValid) {
          throw new HttpException(
            'Incorrect meeting credentials',
            HttpStatus.FORBIDDEN,
          );
        }
      }

      // Validate room status and user permissions
      switch (roomDetails.metadata.status) {
        case 'created':
          if (userId === roomDetails.metadata.ownerId) {
            await this.roomService.activateRoom(roomId, roomDetails);

            return {
              success: true,
              message: 'Room activated successfully',
              status: 'active',
            };
          } else {
            throw new HttpException(
              'Only the room owner can start the meeting',
              HttpStatus.FORBIDDEN,
            );
          }

        case 'active':
          await this.roomService.incrementUsers(roomId, roomDetails);
          return {
            success: true,
            message: 'Successfully joined the room',
            status: 'active',
          };

        case 'closed':
          throw new HttpException(
            'The meeting has ended',
            HttpStatus.FORBIDDEN,
          );

        default:
          throw new HttpException(
            'Invalid room status',
            HttpStatus.BAD_REQUEST,
          );
      }
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':roomId')
  async getRoomDetails(@Param('roomId') roomId: string) {
    try {
      const roomDetails = await this.roomService.getRoomDetails(roomId);
      const owner = await this.authService.getUserById(
        roomDetails.metadata.ownerId,
      );
      const response: RoomDetails = {
        roomName: roomDetails.roomName,
        owner: owner,
        description: roomDetails.metadata.description,
        guidelines: roomDetails.metadata.guidelines,
      };

      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}
