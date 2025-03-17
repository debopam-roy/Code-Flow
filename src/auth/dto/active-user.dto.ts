import { IsNotEmpty, IsString } from 'class-validator';

export class ActiveUserDTO {
  @IsNotEmpty()
  @IsString()
  user_name: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  profile_picture: string;
}
