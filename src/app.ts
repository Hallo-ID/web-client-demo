export class App {
  private router: any;

  configureRouter(config, router) {
    this.router = router;
    config.title = 'HalloID';
    config.map([
      {route: ['', 'home'], name: 'home', moduleId: 'view/hello-world/hello-world'},
      // { route: 'users',            name: 'users',      moduleId: 'users/index', nav: true, title: 'Users' },
      // { route: 'users/:id/detail', name: 'userDetail', moduleId: 'users/detail' },
      // { route: 'files/*path',      name: 'files',      moduleId: 'files/index', nav: 0,    title: 'Files', href:'#files' }
    ]);
  }
}
