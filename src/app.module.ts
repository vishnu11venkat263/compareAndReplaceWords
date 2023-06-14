import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotepadController } from './notepad/notepad.controller';
import { NotepadService } from './notepad/notepad.service';
import { NotepadModule } from './notepad/notepad.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule,NotepadModule],
  controllers: [AppController, NotepadController],
  providers: [AppService, NotepadService],
})
export class AppModule {}
