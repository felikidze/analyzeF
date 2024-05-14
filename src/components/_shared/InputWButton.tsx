import {FC, useState, useCallback, ChangeEvent} from 'react';
import { Button } from 'antd';

interface IInputWButton {
    onBtnClick: (value: string) => Promise<void>|void;
    btnTitle: string;
}

const InputWButton: FC<IInputWButton> = (props) => {
    const {btnTitle} = props;

    const [inputValue, setInputValue] = useState('');
    const onInputChanged = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }, []);
    const onBtnClick = useCallback(() => {
        props.onBtnClick(inputValue);
    }, [inputValue, props.onBtnClick]);

    return (
        <div>
            <input value={inputValue} onChange={onInputChanged} />
            <Button type="primary" onClick={onBtnClick}>{btnTitle}</Button>
        </div>
    );
};

export default InputWButton;