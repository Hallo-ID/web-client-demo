import { MdcSnackbarService } from '@aurelia-mdc-web/snackbar';
import { autoinject } from 'aurelia-framework';

@autoinject
export class Login {

  showPasswordProcess: boolean;

  constructor(showPasswordProcess: boolean, private snackbar: MdcSnackbarService) {
    this.showPasswordProcess = showPasswordProcess;
  }

  attached() {
    // this.checked = false;
    this.showPasswordProcess = false;
  }

}
