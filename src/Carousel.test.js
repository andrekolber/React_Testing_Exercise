import React from 'react';
import { render, fireEvent, queryAllByAltText } from '@testing-library/react';
import Carousel from './Carousel';

it('renders without crashing', () => {
	render(<Carousel />);
});

it('matches snapshot', () => {
	const { asFragment } = render(<Carousel />);
	expect(asFragment()).toMatchSnapshot();
});

it('matches snapshot', () => {
	const { asFragment } = render(<Carousel title="Test Title" />);
	expect(asFragment()).toMatchSnapshot();
});

it('works when you click on the right arrow', function() {
	const { queryByTestId, queryByAltText } = render(<Carousel />);

	// expect the first image to show, but not the second
	expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).toBeInTheDocument();
	expect(queryByAltText('Photo by Pratik Patel on Unsplash')).not.toBeInTheDocument();

	// move forward in the carousel
	const rightArrow = queryByTestId('right-arrow');
	fireEvent.click(rightArrow);

	// expect the second image to show, but not the first
	expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).not.toBeInTheDocument();
	expect(queryByAltText('Photo by Pratik Patel on Unsplash')).toBeInTheDocument();
});

it('works when you click on the left arrow', () => {
	const { queryByTestId, queryByAltText } = render(<Carousel />);

	const rightArrow = queryByTestId('right-arrow');
	fireEvent.click(rightArrow);

	expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).not.toBeInTheDocument();
	expect(queryByAltText('Photo by Pratik Patel on Unsplash')).toBeInTheDocument();

	const leftArrow = queryByTestId('left-arrow');
	fireEvent.click(leftArrow);

	expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).toBeInTheDocument();
	expect(queryByAltText('Photo by Pratik Patel on Unsplash')).not.toBeInTheDocument();
});

test('left arrow missing on first image', () => {
	const { queryByTestId } = render(<Carousel />);

	const rightArrow = queryByTestId('right-arrow');
	const leftArrow = queryByTestId('left-arrow');

	expect(leftArrow).not.toBeInTheDocument();
	expect(rightArrow).toBeInTheDocument();
});

test('right arrow missing on last image', () => {
	const { queryByTestId, debug } = render(<Carousel />);

	const rightArrow = queryByTestId('right-arrow');

	fireEvent.click(rightArrow);
	fireEvent.click(rightArrow);

	const leftArrow = queryByTestId('left-arrow');

	expect(leftArrow).toBeInTheDocument();
	expect(rightArrow).not.toBeInTheDocument();
});
