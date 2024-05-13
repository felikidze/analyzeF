import {ChangeEvent, FC, useCallback, useContext, useState} from 'react';
import {AuthContext} from "@context/AuthContext.tsx";

const Login: FC = () => {
    const {handleSignIn} = useContext(AuthContext);
    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const onLoginChanged = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setLoginValue(e.currentTarget.value)
    }, []);
    const onPasswordChanged = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.currentTarget.value)
    }, []);
    const onBtnClick = useCallback(() => {
        handleSignIn?.({
            userName: loginValue,
            password: passwordValue
        });
    }, [loginValue, passwordValue, handleSignIn]);

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
                <button onClick={onBtnClick}/>
            </div>
        </div>
    );
};

export default Login;