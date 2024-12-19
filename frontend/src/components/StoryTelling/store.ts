import { action, makeObservable, observable } from "mobx";
import { wait } from "src/shared/utils/wait";

export class StoryTellingStore {
  public step: "start" | "santa" | "elf" | "finish" = "start";
  private readonly saveProgress: () => Promise<void>;

  constructor({ saveProgress }: { saveProgress: () => Promise<void> }) {
    this.saveProgress = saveProgress;

    makeObservable<this, "setStep">(this, {
      step: observable,
      setStep: action,
    });
  }

  public run = async () => {
    await wait(1000);
    this.setStep("santa");
    await wait(2000);
    this.setStep("elf");
    await this.saveProgress();
    await wait(2000);
    this.setStep("finish");
  };

  private setStep = (step: StoryTellingStore["step"]) => {
    this.step = step;
  };
}
