import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LocationForm from '../components/LocationForm';
import api from '../services/api';

jest.mock('../services/api');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test('renderiza o formulário corretamente', () => {
  render(
    <MemoryRouter>
      <LocationForm />
    </MemoryRouter>
  );
  expect(screen.getByText('Cadastro de Localização')).toBeInTheDocument();
  expect(screen.getByLabelText('Nome:')).toBeInTheDocument();
  expect(screen.getByLabelText('Coordenada X:')).toBeInTheDocument();
  expect(screen.getByLabelText('Coordenada Y:')).toBeInTheDocument();
});

test('valida coordenadas inválidas', async () => {
  render(
    <MemoryRouter>
      <LocationForm />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText('Nome:'), { target: { value: 'Local A' } });
  fireEvent.change(screen.getByLabelText('Coordenada X:'), { target: { value: 'abc' } });
  fireEvent.change(screen.getByLabelText('Coordenada Y:'), { target: { value: '123' } });

  fireEvent.submit(screen.getByRole('button', { name: /Cadastrar/i }));

  expect(await screen.findByText('Por favor, insira coordenadas válidas.')).toBeInTheDocument();
});

// Teste de sucesso no cadastro
test('submete o formulário com sucesso', async () => {
  api.post.mockResolvedValue({});

  render(
    <MemoryRouter>
      <LocationForm />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText('Nome:'), { target: { value: 'Local B' } });
  fireEvent.change(screen.getByLabelText('Coordenada X:'), { target: { value: '45.23' } });
  fireEvent.change(screen.getByLabelText('Coordenada Y:'), { target: { value: '-12.34' } });

  fireEvent.submit(screen.getByRole('button', { name: /Cadastrar/i }));

  expect(api.post).toHaveBeenCalledWith('/locations/', {
    nome: 'Local B',
    coordenada_x: 45.23,
    coordenada_y: -12.34,
  });

  expect(await screen.findByText('Localização cadastrada com sucesso!')).toBeInTheDocument();
  expect(mockNavigate).toHaveBeenCalledWith('/');
});

// Teste de erro ao cadastrar
test('exibe erro ao falhar no cadastro', async () => {
  api.post.mockRejectedValue(new Error('Erro na API'));

  render(
    <MemoryRouter>
      <LocationForm />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText('Nome:'), { target: { value: 'Local C' } });
  fireEvent.change(screen.getByLabelText('Coordenada X:'), { target: { value: '20.12' } });
  fireEvent.change(screen.getByLabelText('Coordenada Y:'), { target: { value: '-50.45' } });

  fireEvent.submit(screen.getByRole('button', { name: /Cadastrar/i }));

  expect(await screen.findByText('Falha ao cadastrar localização.')).toBeInTheDocument();
});
