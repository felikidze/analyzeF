import {ChangeEvent, FC, useCallback, useState, useContext} from 'react';

import {AuthContext} from '@context/AuthContext';
import {UserRole} from '@components/entities/User/index';


const Registration: FC = () => {
    const {handleSignUp} = useContext(AuthContext);
    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const onLoginChanged = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setLoginValue(e.currentTarget.value)
    }, []);
    const onPasswordChanged = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.currentTarget.value)
    }, []);
    const onEmailChanged = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.currentTarget.value)
    }, []);
    const onBtnClick = useCallback(() => {
        handleSignUp?.({
            userName: loginValue,
            password: passwordValue,
            email: emailValue,
            role: UserRole.USER
        });
    }, [loginValue, passwordValue, handleSignUp]);

    return (
        <div>
            <div>
                <div>Логин</div>
                <input value={loginValue} onChange={onLoginChanged}/>
            </div>
            <div>
                <div>Пароль</div>
                <input value={passwordValue} onChange={onPasswordChanged}/>
            </div>
            <div>
                <div>Почта</div>
                <input value={emailValue} onChange={onEmailChanged}/>
            </div>
            <div>
                <button onClick={onBtnClick}/>
            </div>
        </div>
    );
};

export default Registration;