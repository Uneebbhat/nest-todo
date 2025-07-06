import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [UserModule, DatabaseModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
