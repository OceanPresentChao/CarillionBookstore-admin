export const enum Types {
    USER = 'userStore',
    TABS = 'tabsStore',
    COLLAPSE = 'collapseStore',
    MENU = 'menuStore'
}

export interface Tab {
    title: string,
    path: string
}

export interface Collapse {
    count: number,
    collapse: boolean
}