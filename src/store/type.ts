export const enum Types {
    USER = 'userStore',
    TABS = 'tabsStore',
    MENU = 'menuStore'
}

export interface Tab {
    title: string,
    path: string
}
