import {Aurelia, PLATFORM} from 'aurelia-framework';
import environment from './environment';

export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
    // .plugin(PLATFORM.moduleName('@aurelia-mdc-web/all'))
    .plugin(PLATFORM.moduleName('@aurelia-mdc-web/top-app-bar'))
    .plugin(PLATFORM.moduleName('@aurelia-mdc-web/all'))
    .feature('resources');

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
