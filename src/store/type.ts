export const enum Types {
    USER = 'userStore',
    TABS = 'tabsStore',
    MENU = 'menuStore',
    AUTH = 'authStore',
}

export interface Tab {
    title: string,
    path: string
}
