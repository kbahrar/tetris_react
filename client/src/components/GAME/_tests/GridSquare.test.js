import { render, screen } from '@testing-library/react';
import GridSquare from '../GridSquare';
import React from 'react';

describe("<GridSquare />", () => {

    test('test for normal square', () => {
        const { container } = render(
            <GridSquare classe='haha' color='1'/>
        );
    
        expect(container).not.toBeEmptyDOMElement();
    });

    test('test for normal square shadow', () => {
        const { container } = render(
            <GridSquare shadow='true' color='1'/>
        );
    
        expect(container).not.toBeEmptyDOMElement();
    });

})