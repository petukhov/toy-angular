import { Component } from 'toy-angular';

@Component({
    selector: "app-root",
    template: "<h1>My First Angular App</h1>",
    
})
export class AppComponent {
  constructor() {
    console.log("AppComponent");
  }
}
