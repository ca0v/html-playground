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
    let albums = resp.result.albums as Array<GoogleAlbum>;
    while (resp.result.nextPageToken) {
      resp = await gapi.client.photoslibrary.albums.list({pageToken: resp.result.nextPageToken});
      if (resp.status !== 200)
        throw `status: ${resp.status}`;
      console.log({ resp });
      albums = albums.concat(resp.result.albums);
    }
    return albums;
  }

  async getAlbum(album: GoogleAlbum) {
    let data = await gapi.client.photoslibrary.mediaItems.search({ albumId: album.id });
    let {mediaItems} = data.result;
    while (data.result.nextPageToken) {
      data = await gapi.client.photoslibrary.mediaItems.search({ albumId: album.id, pageToken: data.result.nextPageToken });
      mediaItems.push(...data.result.mediaItems);
    }
    return mediaItems;
  }

  async getPhoto(mediaItemId: string) {
    let data = await gapi.client.photoslibrary.mediaItems.get({ mediaItemId });
    return (data.result) as GoogleMediaItem;
  }
}
