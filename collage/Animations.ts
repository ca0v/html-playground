/**
 * runs an animation on an interval, returns stop()
 * Used for panning, zooming, rotating
 */
export class Animations {
  animations: Array<{
    type: string;
    handle: number;
  }> = [];
  stop(type: string) {
    let animations = this.animations.map(v => v); //clone
    animations.forEach((v, i) => {
      if (!type || v.type === type) {
        clearInterval(v.handle);
        this.animations.splice(i, 1);
      }
    });
  }
  animate(type: string, cb: () => void) {
    this.animations.push({ type, handle: setInterval(cb, 100) });
  }
}
