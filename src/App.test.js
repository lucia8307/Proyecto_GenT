import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('renders navigation links', () => {
  render(
    <Router>
      <App />
    </Router>
  );

  // Verificar que algunos enlaces de navegación existan
  const loginLink = screen.getByText(/iniciar sesión/i);
  const registerLink = screen.getByText(/registro/i);
  const uploadLink = screen.getByText(/subir material/i);
  const searchLink = screen.getByText(/buscar material/i);

  expect(loginLink).toBeInTheDocument();
  expect(registerLink).toBeInTheDocument();
  expect(uploadLink).toBeInTheDocument();
  expect(searchLink).toBeInTheDocument();
});
