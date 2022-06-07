class ActionItem {
    icon;
    title;
    onClick;

    constructor(icon, title, onClick) {
        this.icon = icon;
        this.title = title;
        this.onClick = onClick;
    }
}

export { ActionItem };