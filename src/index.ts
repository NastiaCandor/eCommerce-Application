import './styles/style.scss';
import App from './components/app/app';
import ClientAPI from './components/utils/Client';

const clientApi = new ClientAPI();

async function bootstrap() {
  try {
    await clientApi.prefetchData();
    const app = new App(clientApi);
    app.start();
  } catch (e) {
    console.error(`Error while init the app: ${e}`);
  }
}

bootstrap();
