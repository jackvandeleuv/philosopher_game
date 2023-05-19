export class ImageRepository {
    private cache: Map<string, HTMLImageElement>;

    constructor() {
        this.cache = new Map<string, HTMLImageElement>();
    }

    // This function loads an image and stores it in the cache.
    async loadImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const existingImage = this.cache.get(url);
            if (existingImage) {
                resolve(existingImage);
                return;
            }

            const image = new Image();
            image.onload = () => {
                this.cache.set(url, image);
                resolve(image);
            };

            image.onerror = () => {
                reject(new Error(`Failed to load image at ${url}`));
            };
            
            image.src = url;
        });
    }

    // getImage returns the image if it's loaded, or null if it's not.
    getImage(url: string): HTMLImageElement | null {
        return this.cache.get(url) || null;
    }
}
