import { Component } from '../../framework/shared';
import template from './basic.component.html';
import styles from './basic.component.css';

@Component({
    selector: 'app-basic',
    template: compile(template), // returns an array of functions
    styles
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