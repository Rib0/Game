import { shallow } from 'enzyme';
import React from 'react';
import Button, { IStyledButtonProps } from '../../../javascript/games/balls/components/Button';

const setup = (props: IStyledButtonProps) => shallow(<Button {...props} />);

describe('Button test from balls game', () => {
    const props = {
        onClick: () => { },
        text: 'button'
    }

    it('Button test', () => {
        const Component = setup(props);
        expect(Component.find('Button')).toHaveLength(1);
    })
})