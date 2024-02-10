import { Component } from '../../framework/shared';

@Component({
    selector: 'app-basic',
    template: 'basic.component.html',
    styles: 'basic.component.css'
})
export class BasicComponent {
    count = 0;

    constructor() {
        console.log('BasicComponent');
    }

    increment() {
        this.count++;
    }
}