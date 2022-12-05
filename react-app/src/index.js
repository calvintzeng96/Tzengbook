import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider, SelectedModals } from './context/Modal';
import ScrollTop from './components/ScrollTop';

const store = configureStore();

function Root() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
        <SelectedModals />
          <ScrollTop />
          <App />
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
