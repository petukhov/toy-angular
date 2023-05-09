import { bootstrapApp } from '../framework/shared';
import { BasicComponent } from './component/basic.component';

bootstrapApp({
    id: 'root',
    rootComponent: BasicComponent
});