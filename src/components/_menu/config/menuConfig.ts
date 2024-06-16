import {RoutePath} from '@router/config/routeConfig';

interface MENU_CONFIG_VALUES {
    title: string;
    authOnly: boolean;
    routePath: string;
    withoutAuthOnly?: boolean;
}

export const MENU_CONFIG: Record<string, MENU_CONFIG_VALUES> = {
    REGISTRATION: {
        title: 'Регистрация',
        authOnly: false,
        routePath: RoutePath.registration,
        withoutAuthOnly: true
    },
    LOGIN: {
        title: 'Логин',
        authOnly: false,
        routePath: RoutePath.login,
        withoutAuthOnly: true
    },
    FEED: {
        title: 'Лента',
        authOnly: true,
        routePath: RoutePath.feed
    },
    DOMAIN: {
        title: 'Домены',
        authOnly: true,
        routePath: RoutePath.domains
    },
    PARSER_PAGE: {
        title: 'Скан',
        authOnly: true,
        routePath: RoutePath.parser_page
    }
};