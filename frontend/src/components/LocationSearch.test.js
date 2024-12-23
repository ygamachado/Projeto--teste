import { render, screen, fireEvent } from '@testing-library/react';
import SearchProximity from '../pages/SearchProximity';
import api from '../services/api';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../services/api');

// Simula Swal para evitar pop-ups durante o teste
global.Swal = {
  fire: jest.fn(() => Promise.resolve())
};

describe('SearchProximity Component', () => {
  test('renderiza o formulário corretamente', () => {
    render(
      <MemoryRouter>
        <SearchProximity />
      </MemoryRouter>
    );

    expect(screen.getByText('Buscar por Proximidade')).toBeInTheDocument();
    expect(screen.getByLabelText('Coordenada X:')).toBeInTheDocument();
    expect(screen.getByLabelText('Coordenada Y:')).toBeInTheDocument();
    expect(screen.getByLabelText('Distância Máxima (em metros):')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument();
  });

  test('exibe alerta ao tentar buscar com campos inválidos', async () => {
    render(
      <MemoryRouter>
        <SearchProximity />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Coordenada X:'), { target: { value: 'abc' } });
    fireEvent.change(screen.getByLabelText('Coordenada Y:'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Distância Máxima (em metros):'), { target: { value: 'xyz' } });
    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(global.Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Aviso',
        text: 'Por favor, insira valores válidos para todas as coordenadas e distância.',
        icon: 'warning'
      })
    );
  });

  test('realiza busca e exibe resultados', async () => {
    api.get.mockResolvedValue({
      data: [
        { id: 1, nome: 'POI 1', coordenada_x: 10, coordenada_y: 20 },
        { id: 2, nome: 'POI 2', coordenada_x: 15, coordenada_y: 25 }
      ]
    });

    render(
      <MemoryRouter>
        <SearchProximity />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Coordenada X:'), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText('Coordenada Y:'), { target: { value: '20' } });
    fireEvent.change(screen.getByLabelText('Distância Máxima (em metros):'), { target: { value: '500' } });
    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));

    const result1 = await screen.findByText('POI 1 - 10, 20');
    const result2 = await screen.findByText('POI 2 - 15, 25');

    expect(result1).toBeInTheDocument();
    expect(result2).toBeInTheDocument();
  });

  test('exibe mensagem quando não há resultados', async () => {
    api.get.mockResolvedValue({ data: [] });

    render(
      <MemoryRouter>
        <SearchProximity />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Coordenada X:'), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText('Coordenada Y:'), { target: { value: '20' } });
    fireEvent.change(screen.getByLabelText('Distância Máxima (em metros):'), { target: { value: '500' } });
    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(global.Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Sem resultados',
        text: 'Nenhum ponto de interesse encontrado na área especificada.',
        icon: 'info'
      })
    );
  });
});
