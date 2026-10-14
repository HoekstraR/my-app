import { render, screen } from '@testing-library/react';
import LandingPage from '../app/page';

describe('LandingPage', () => {
  it('renders the main heading', () => {
    render(<LandingPage />);
    expect(screen.getByText('This is Your Digital Canvas')).toBeInTheDocument();
  });

  it('shows the call-to-action', () => {
    render(<LandingPage />);
    expect(screen.getByText('Start chatting now')).toBeInTheDocument();
  });

  it('displays all three example suggestions', () => {
    render(<LandingPage />);
    expect(screen.getByText(/bakery website/i)).toBeInTheDocument();
    expect(screen.getByText(/portfolio/i)).toBeInTheDocument();
    expect(screen.getByText(/handmade jewelry/i)).toBeInTheDocument();
  });

  it('shows the how-it-works steps', () => {
    render(<LandingPage />);
    expect(screen.getByText('1. Chat About Your Idea')).toBeInTheDocument();
    expect(screen.getByText('2. Watch It Transform')).toBeInTheDocument();
    expect(screen.getByText('3. Take It With You')).toBeInTheDocument();
  });
});
