export const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    const start = performance.now();

    const step = (timestamp: number) => {
      if (timestamp - start >= ms) {
        resolve();
      } else {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  });
