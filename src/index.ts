import Header from './components/containers/header/header';
import About from './pages/about/about';
import Settings from './pages/settings/settings';
import BestScore from './pages/best-score/best-score';
import Control from './components/elements/control';
import './style.css';
import Game from './pages/game/game';
import Registration from './components/containers/state-popup/registration';

class Application {
  wrapper: Control;

  header: Header;

  app: Control;

  constructor(parent: HTMLElement) {
    this.wrapper = new Control(parent, 'div', 'header__wrapper');
    this.header = new Header(document.querySelector('.header__wrapper'));
    this.app = new Control(parent, 'div', 'app');
  }
}

const app = new Application(document.body);

const routerView = document.querySelector('.app');
const links = document.querySelectorAll('.list__item-link');
const startLink = document.querySelector('.start-link');
const stopLink = document.querySelector('.stop-link');
const regLink = document.querySelector('.registration-link');

const regLinkEl = new Registration(() => {
  document.body.removeChild(regLinkEl.node);
});
if (regLink) {
  regLink.addEventListener('click', () => {
    document.body.appendChild(regLinkEl.node);
    regLinkEl.drawImage('./assets/images/temp.jpg');
  });
}

const changeHeaderLinks = (): void => {
  if (regLink?.classList.contains('unavailable')) {
    startLink?.classList.add('available');
    stopLink?.classList.remove('available');
  }
};

const onRouteChanged = (): Control => {
  const { hash } = window.location;
  if (!(routerView instanceof HTMLElement)) {
    throw new ReferenceError('No router view element available for rendering');
  }
  routerView.innerHTML = '';
  links.forEach(link => {
    if (link instanceof HTMLAnchorElement) {
      if (
        link.href.slice(link.href.lastIndexOf('#') + 1) ===
        hash.slice(hash.lastIndexOf('#') + 1)
      ) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
  switch (hash) {
    case '':
      changeHeaderLinks();
      return new About(routerView);
    case '#score':
      changeHeaderLinks();
      return new BestScore(routerView);
    case '#settings':
      changeHeaderLinks();
      return new Settings(routerView);
    case '#start':
      return new Game(routerView);
    default:
      return new About(routerView);
  }
};

window.addEventListener('hashchange', onRouteChanged);
onRouteChanged();
