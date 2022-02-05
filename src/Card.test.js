import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Card from './Card';

it('renders without crashing', () => {
	render(<Card />);
});

it('matches snapshot', () => {
	const { asFragment } = render(<Card />);
	expect(asFragment()).toMatchSnapshot();
});

it('matches snapshot', () => {
	const { asFragment } = render(<Card caption="This is a caption" />);
	expect(asFragment()).toMatchSnapshot();
});
