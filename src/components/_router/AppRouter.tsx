import {Suspense, useCallback, useContext, useEffect} from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {AppRoutesProps, routeConfig, RoutePath} from '@router/config/routeConfig'
import Menu from '@components/_menu/Menu';
import {AuthContext} from "@context/AuthContext.tsx";

const AppRouter = () => {
    const {isUserLogged} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (
            ([RoutePath.login, RoutePath.registration].includes(location.pathname) && isUserLogged) ||
            !([RoutePath.login, RoutePath.registration].includes(location.pathname) && !isUserLogged)
        ) {
            navigate(RoutePath.main);
        }
    }, [isUserLogged]);

    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<>Loading</>}>
                {route.element}
            </Suspense>
        );


        //route.authOnly ? <RequireAuth roles={route.roles}>{element}</RequireAuth> : element
        return (
            <Route
                key={route.path}
                path={route.path}
                element={element}
            />
        );
    }, []);

    return (
        <>
            <Menu/>
            <Routes>
                {Object.values(routeConfig).map(renderWithWrapper)}
            </Routes>
        </>
    );
};

export default AppRouter;
