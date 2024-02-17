import { Component } from "toy-angular";

@Component({
  selector: "app-root",
  template: `
    <div id="this-is-id" something="hello">
        <h1>This is Toy Angular</h1>
        <span>Let's play!</span>
        {{ someValue }}
    </div>
  `,
})
export class AppComponent {

  someValue = 123;

  constructor() {
    console.log("AppComponent");
  }
}
