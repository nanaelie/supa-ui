declare module "*.css" {
    const styles: { [className: string]: string }
    export * from styles
}