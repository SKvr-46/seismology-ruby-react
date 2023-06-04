import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Container } from './components/Container';
import { WavenumberCalcForm } from './components/WavenumberCalcForm';
import { Users } from './components/Users';


const path = window.location.pathname;

if (path === '/') {
  const container:  HTMLElement = document.getElementById('root')!;
  const root = createRoot(container);
    root.render(
      <>
      <Header/>
      <Container>
      <App/>
      <WavenumberCalcForm/>
      </Container>
      <Footer/>
      </>
  
    );
} else if(path === "/users") {
  const users_container:  HTMLElement = document.getElementById('users')!;
  const users = createRoot(users_container);
  
    users.render(
      <>
      <Header/>
      <Container>
      <Users/>
      </Container>
      <Footer/>
      </>
  
    );
}

