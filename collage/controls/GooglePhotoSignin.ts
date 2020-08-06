import { GooglePhotoAPI } from "../models/GooglePhotoAPI";

declare var gapi: GooglePhotoAPI;

export class GooglePhotoSignin {
  private peopleApiDiscovery = "";
  // where to store these values?
  private scopes = "https://www.googleapis.com/auth/photoslibrary.readonly";

  private authorizeButton: HTMLButtonElement|null = null;
  private signoutButton: HTMLButtonElement|null = null;

  private ready = () => { };

  async handleClientLoad() {
    // Load the API client and auth2 library.
    await new Promise((resolve, reject) => {
      gapi.load("client:auth2", resolve);
    });
    let credentialsResponse = await fetch("./web/credentials.json");
    let credentials: {
      apiKey: string;
      clientId: string;
    } = await credentialsResponse.json();
    let resp = await fetch("./web/photos_rest_v1.json");
    this.peopleApiDiscovery = await resp.json();
    await this.initClient(credentials);
  }

  private async initClient(args: {
    apiKey: string;
    clientId: string;
  }) {

    this.authorizeButton = document.getElementById("authorize-button") as HTMLButtonElement;
    if (!this.authorizeButton) throw "a clickable element must exist with id of 'authorize-button'";

    this.signoutButton = document.getElementById("signout-button") as HTMLButtonElement;
    if (!this.signoutButton) throw "a clickable element must exist with id of 'signout-button'";

    return new Promise<any>(async (good, bad) => {
      this.ready = () => good();
      await gapi.client.init({
        apiKey: args.apiKey,
        discoveryDocs: [this.peopleApiDiscovery],
        clientId: args.clientId,
        scope: this.scopes,
      });
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(status => this.updateSigninStatus(status));
      // Handle the initial sign-in state.
      this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      this.authorizeButton!.onclick = () => this.handleAuthClick();
      this.signoutButton!.onclick = () => this.handleSignoutClick();
    });
  }

  private updateSigninStatus(isSignedIn: boolean) {
    if (isSignedIn) {
      this.authorizeButton!.style.display = "none";
      this.signoutButton!.style.display = "block";
      this.ready();
    }
    else {
      this.authorizeButton!.style.display = "block";
      this.signoutButton!.style.display = "none";
    }
  }

  private handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
  }

  private handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
  }
}
