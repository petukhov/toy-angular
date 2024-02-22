import { Component } from "toy-angular";

@Component({
  selector: "app-root",
  template: `
    <div id="this-is-id" something="hello">
        <h1>This is Toy Angular</h1>
        <p>Let's play!</p>
        This is dynamic: {{ someValue }}.
    </div>
  `,
})
export class AppComponent {

  someValue = 123;

  constructor() {
    console.log("AppComponent");
  }
}
