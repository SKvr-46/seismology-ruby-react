import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import { Footer } from './components/Footer';
import { Container } from './components/Container';

const container = document.getElementById('root');
const root = createRoot(container);

document.addEventListener('DOMContentLoaded', () => {
  root.render(
    <>
    <Container>
    <App/>
    </Container>
    <Footer/>
    </>

  );
});