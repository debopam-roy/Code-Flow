import { Module } from '@nestjs/common';
import { EditorGateway } from './gateway/editor.gateway';

@Module({
  providers: [EditorGateway],
})
export class EditorModule {}
