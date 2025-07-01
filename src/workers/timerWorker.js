let isRunning = false;

self.onmessage = function (e) {
  if (isRunning) return;

  isRunning = true;

  const task = e.data;
  const { activeTask, secondsRemaining } = task;

  const endDate = activeTask.startDate + secondsRemaining * 1000;

  const now = new Date();

  let countDownSeconds = Math.ceil((endDate - now) / 1000);

  const tick = () => {
    self.postMessage(countDownSeconds);
    const now = new Date();
    countDownSeconds = Math.floor((endDate - now) / 1000);

    setTimeout(tick, 1000);
  };

  tick();
};
