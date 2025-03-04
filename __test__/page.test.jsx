import { render, screen, waitFor } from '@testing-library/react';
import Page from '../app/page';
import { useSearchParams } from "next/navigation";

jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(),
  }));

describe('Page', () => {
    it('renders the App', () => {
      render(<Page />)
      const container = screen.getByTestId('page-container');
      expect(container).toBeInTheDocument()
    })
    it('renders grid layout by default after API fetch success', async () => {
        const {debug} = render(<Page />);
        await waitFor(() => expect(screen.getByTestId('grid-layout')).toBeInTheDocument());
    });

    it('renders list layout by default after API fetch success', async () => {
        useSearchParams.mockReturnValue({
            get: jest.fn().mockReturnValue('tourist'),
        });
        render(<Page />);
        await waitFor(() => expect(screen.getByText('Loading Components...')).toBeInTheDocument());
        await new Promise(resolve => setTimeout(resolve, 1000));
        await waitFor(() => expect(screen.getByTestId('list-layout')).toBeInTheDocument());
    });
  })