import { GooglePhotoSignin } from "./GooglePhotoSignin";
import { GoogleMediaItem } from "../models/GoogleMediaItem";
import { GoogleAlbum } from "../models/GoogleAlbum";
import { GooglePhotoAPI } from "../models/GooglePhotoAPI";

declare var gapi: GooglePhotoAPI;

export class GooglePhotos {
  async getAlbums() {
    let signin = new GooglePhotoSignin();
    await signin.handleClientLoad();
    let resp = await gapi.client.photoslibrary.albums.list();
    if (resp.status !== 200)
      throw `status: ${resp.status}`;
    console.log({ resp });
    return resp.result.albums as Array<GoogleAlbum>;
  }
  async getAlbum(album: GoogleAlbum) {
    let data = await gapi.client.photoslibrary.mediaItems.search({ albumId: album.id });
    return data.result.mediaItems;
  }
  async getPhoto(mediaItemId: string) {
    let data = await gapi.client.photoslibrary.mediaItems.get({ mediaItemId });
    return (data.result) as GoogleMediaItem;
  }
}