import {FC, createContext, ReactNode} from 'react';

interface IMainContextProps {

}

export const MainContext = createContext<IMainContextProps>({});

interface MainContextProviderProps {
    children?: ReactNode | undefined;
}

const MainContextProvider: FC<MainContextProviderProps> = (props) => {
    const defaultProps = props;

    return (
        <MainContext.Provider value={defaultProps}>
            {props.children}
        </MainContext.Provider>
    );
};

export default MainContextProvider;