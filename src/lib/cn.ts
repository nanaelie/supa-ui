// TODO: remplacer par clsx + tailwind-merge dans les projets qui les utilisent déjà
export function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}
