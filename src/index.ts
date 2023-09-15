import './styles/style.scss';
import './components/import-files';
import App from './components/app/app';
import ClientAPI from './components/utils/Client';
import SpinnerView from './components/utils/SpinnerView';

const clientApi = new ClientAPI();
const spinner = new SpinnerView();

async function bootstrap() {
  try {
    spinner.render(document.body);
    await clientApi.prefetchData();
    new App(clientApi, spinner).start();
  } catch (e) {
    console.error(`Error while init the app: ${e}`);
  }
}

bootstrap();
