import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
import { GooglePhotos } from "../controls/GooglePhotos";
import { GoogleCollagePhoto } from "../controls/GoogleCollagePhoto";

export class OpenAlbumsCommand implements Command {
    async execute(repl: Repl, args?: string | undefined): Promise<false | void> {
        if (!args) {
            await this.openAlbums(repl);
            return;
        }
        let albumNames = args.split(",");
        await this.openAlbums(repl, albumNames);
    }

    async openAlbums(repl: Repl, albumNames?: Array<string>) {
        let photos = new GooglePhotos();
        const target = document.querySelector(".photos") as HTMLElement;
        if (target) {
            let albums = await photos.getAlbums();
            if (albumNames) albums = albums.filter(a => -1 < albumNames.indexOf(a.title));
            albums.forEach(async (album) => {
                console.log(`opening album: ${album.id} (${album.title})`);
                let mediaItems = await photos.getAlbum(album);
                mediaItems.forEach(mediaItem => {
                    let photo = new GoogleCollagePhoto(mediaItem);
                    repl.photos.push(photo);
                    photo.renderInto(target);
                    repl.reindexPhotos();
                });
            });
        }
    }
}
