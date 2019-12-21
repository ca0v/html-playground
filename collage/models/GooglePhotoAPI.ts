import { GoogleMediaItem } from "./GoogleMediaItem";
export interface GooglePhotoAPI {
  auth2: {
    getAuthInstance: () => {
      isSignedIn: {
        listen: (cb: (isSignedIn: boolean) => void) => void;
        get: () => boolean;
      };
      signIn: () => void;
      signOut: () => void;
    };
  };
  load: (type: string, cb: Function) => void;
  client: {
    init: (args: {
      apiKey: string;
      discoveryDocs: Array<string>;
      clientId: string;
      scope: string;
    }) => Promise<any>;
    photoslibrary: {
      albums: {
        list: Function;
      };
      mediaItems: {
        search: (args: {
          albumId: string;
        }) => Promise<{
          result: {
            nextPageToken?: string;
            mediaItems: Array<GoogleMediaItem>;
          };
        }>;
        get: (mediaItemId: any) => Promise<{
          result: GoogleMediaItem;
        }>;
      };
    };
  };
}
