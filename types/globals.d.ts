declare const tizen: Tizen;

interface Tizen {
  tvaudiocontrol: TVAudioControl;
  TZDate: new (...arg: any[]) => TZDate;
}

interface TVAudioControl {
  isMute(): boolean;
  setMute(mute: boolean): void;
}

interface TZDate {
  toTimeString(): string;
}

declare module NodeJS {
  interface Global {
    tizen?: Tizen;
  }
}
