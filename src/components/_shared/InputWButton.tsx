import {FC, useState, useCallback, ChangeEvent} from 'react';

interface IInputWButton {
    onBtnClick: (value: string) => Promise<void>|void;
}

const InputWButton: FC<IInputWButton> = (props) => {
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
            <button onClick={onBtnClick}/>
        </div>
    );
};

export default InputWButton;