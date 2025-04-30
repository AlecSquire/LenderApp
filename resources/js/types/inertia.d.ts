declare namespace App.PageProps {
    // Define your shared page props here
}

declare module '@inertiajs/core' {
    interface PageProps extends App.PageProps { }
}
