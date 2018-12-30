# DeviceWISE Angular API Service

An Angular (2+) service for communicating with deviceWISE.

# Installation

```bash
npm install devicewise-angular --save

# or

yarn add devicewise-angular
```

Add the devicewise angular module to your `app.module.ts`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DevicewiseAngularModule } from 'devicewise-angular';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DevicewiseAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Then, import and inject the devicewise angular service into a component:

```typescript
import { Component, OnInit } from '@angular/core';
import { DevicewiseAngularService } from 'devicewise-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private devicewise: DevicewiseAngularService) {}

  ngOnInit() {
    this.devicewise.login(location.origin, 'admin', 'admin').subscribe(loginResponse => {
      console.log(loginResponse);
      this.devicewise.deviceList().subscribe((deviceListResponse) => {
        console.log(deviceListResponse);
      });
    });
  }
}
```

That's it!

# What to do now?

* Run `ng test devicewise-service` to run the tests for the devicewise service (located in the `projects/devicewise-angular` folder)
* Have a look at and play around with the `app` to get to know the devicewise service with `ng serve --open`
* Set up other users in deviceWISE (default credentials are admin/admin)

# Running the Demo

Clone the repository.

```bash
git clone https://github.com/astone2014/devicewise-angular.git
```

Navigate to the folder.

```bash
cd devicewise-angular
```

Install packages.

```bash
npm i
```

Run Demo.

```bash
ng serve --open
```

# FAQ

## General tips

Checking out the following resources usually solves most of the problems people seem to have with this devicewise service:

* [DeviceWISE HELP](https://docs-engr.devicewise.com/)
* [DeviceWISE Javascript Library](http://help.devicewise.com/display/M2MOpen/JavaScript+API+Library)
* [DeviceWISE Postman Collection](https://web.postman.co/collections/4197967-d416fb5a-b10d-47fb-9bd4-b740c4842503?workspace=0a806903-4bd9-4c42-8f6a-a4cecdf162d1)

The following general steps are usually very helpful when debugging problems with this service:

* check out if there are any [open](https://github.com/astone2014/devicewise-angular/issues) or [closed](https://github.com/astone2014/devicewise-angular/issues?q=is%3Aissue+is%3Aclosed) issues that answer your question
* ensure you have a valid sessionID cookie.
* [explain to your local rubber duck why your code should work and why it (probably) does not](https://en.wikipedia.org/wiki/Rubber_duck_debugging)

# Opening issues

Please make sure to check out our FAQ before you open a new issue. Also, try to give us as much information as you can when you open an issue. Maybe you can even supply a test environment or test cases, if necessary?

# Contributing

We are happy to accept pull requests or test cases for things that do not work. Feel free to submit one of those.

However, we will only accept pull requests that pass all tests and include some new ones (as long as it makes sense to add them, of course).

* [Open a new pull request](https://github.com/astone2014/devicewise-angular/compare)

# Author

This service is provided to you free by [Telit IoT Platforms](https://telit.com/).

# License

[MIT](https://github.com/astone2014/devicewise-angular/master/LICENSE)
