import { Component } from '@angular/core';
import 'rxjs/add/operator/map';


/**
 * Entry component
 */
@Component({
  selector: 'app',
  templateUrl: 'client/app.component.html',
  styles: [`.ui.menu.fixed { position: relative; }`]
})
export class AppComponent { }