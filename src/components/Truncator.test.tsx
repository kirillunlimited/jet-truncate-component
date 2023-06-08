import React from 'react';
import { render, screen } from '@testing-library/react';
import Truncator from './Truncator';

const TEXT = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora explicabo ipsa, quod et autem nemo expedita excepturi officia voluptas qui dolorem dignissimos modi perspiciatis in rem neque reiciendis laborum maxime!';

const style = {
  width: '10px',
};

test('renders learn react link', () => {
  render(<Truncator
    tailLength={5}
    style={style}
  >{TEXT}</Truncator>);

  const textElementWithTail = screen.getByText(/reiciendis laborum maxime!/i);
  expect(textElementWithTail).toBeInTheDocument();

  const truncatorContainer =  screen.getByTestId('truncator');
  expect(getComputedStyle(truncatorContainer).width).toBe('10px');
});
