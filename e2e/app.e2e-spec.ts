import { ConFusionAngularPage } from './app.po';

describe('con-fusion-angular App', () => {
  let page: ConFusionAngularPage;

  beforeEach(() => {
    page = new ConFusionAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
