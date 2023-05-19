var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ImageRepository {
    constructor() {
        this.cache = new Map();
    }
    // This function loads an image and stores it in the cache.
    loadImage(url) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    // getImage returns the image if it's loaded, or null if it's not.
    getImage(url) {
        return this.cache.get(url) || null;
    }
}
