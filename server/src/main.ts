import 'reflect-metadata';
import { Container } from '@martinoooo/dependency-injection';
import { AppModule } from './app.module';

const app = Container.get<AppModule>(AppModule);
app.init();
