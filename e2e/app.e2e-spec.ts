import { ImprovingPage } from './app.po';

describe('improving App', function() {
  let page: ImprovingPage;

  beforeEach(() => {
    page = new ImprovingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
