import {Redirect} from 'aurelia-router';

export class App {
  private router: any;

  configureRouter(config, router) {
    this.router = router;
    config.title = 'HalloID';
    config.addAuthorizeStep(AuthorizeStep);
    config.map([
      {route: 'login', name: 'login', moduleId: 'view/login/login', title: 'Login'},
      {route: ['', 'home'], name: 'home', moduleId: 'view/hello-world/hello-world', settings: { auth: true }},
      // { route: 'users',            name: 'users',      moduleId: 'users/index', nav: true, title: 'Users' },
      // { route: 'users/:id/detail', name: 'userDetail', moduleId: 'users/detail' },
      // { route: 'files/*path',      name: 'files',      moduleId: 'files/index', nav: 0,    title: 'Files', href:'#files' }
    ]);
  }
}

class AuthorizeStep {
  run(navigationInstruction, next) {
    if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
      const isLoggedIn = (window.localStorage.getItem("HALLOID_AUTH") != undefined)
      if (!isLoggedIn) {
        return next.cancel(new Redirect('login'));
      }
    }

    return next();
  }
}
