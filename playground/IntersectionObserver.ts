class IntersectionObserverLab {
  randomWalk(node: HTMLElement) {
    let x = Math.random() * 200;
    let y = Math.random() * 200;
    node.style.left = x + "px";
    node.style.top = y + "px";
  }

  async CollisionDetection() {
    let canNotMove = Array.from(document.querySelectorAll(".can-collide.can-not-move")) as Array<HTMLElement>;
    let canMove = Array.from(document.querySelectorAll(".can-collide.can-move")) as Array<HTMLElement>;

    let root = canNotMove[0];
    let target = canMove[0];

    return new Promise((good, bad) => {
      let observer = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          console.log(entries);
          let entry = entries.find(entry => entry.isIntersecting);
          document.title = !entry ? "Outside" : Math.round(entry.intersectionRatio * 100) + "%";
          if (!!entry && 1.0 === entry.intersectionRatio) {
            good({ root, target });
          }
        },
        {
          root: root,
          rootMargin: "0px",
          threshold: 0.1,
        }
      );
      observer.observe(target);
    });
  }

  StartRandomWalk() {
    let canMove = Array.from(document.querySelectorAll(".can-collide.can-move")) as Array<HTMLElement>;
    canMove.forEach(n => this.randomWalk(n));
    return canMove.map(mover => {
      return setInterval(() => this.randomWalk(mover), 1000);
    });
  }

  run() {
    let walkers = this.StartRandomWalk();

    this.CollisionDetection().then((args: { root: HTMLElement; target: HTMLElement }) => {
      walkers.forEach(w => clearInterval(w));
      console.log("Hit!");
      args.target.classList.add("is-captured");
      args.root.classList.add("did-capture");
    });

  }
}

new IntersectionObserverLab().run();