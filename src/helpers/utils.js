export const getImageUrl = (name) => {
    console.log(new URL(`../assets/${name}`, import.meta.url).href);
    return new URL(`../assets/${name}`, import.meta.url).href
}
