import { Component } from "toy-angular";

@Component({
  selector: "app-root",
  template: `
    <div id="this-is-id" something="hello">
        Parent
        <span>My First Angular App</span>
    </div>
  `,
})
export class AppComponent {
  constructor() {
    console.log("AppComponent");
  }
}
