import { IOptions } from "./IOptions";
export declare const showConfirmAlert: (title: string, message?: string | undefined, confirmText?: string, cancelText?: string) => Promise<boolean>;
export default class OtaManager {
    private lastPrompt;
    private lastAppState;
    private options;
    constructor(options: Partial<IOptions>);
    private handleNewBundle;
    private handleAppStateChange;
    private checkForNewAppVersion;
}
export declare const initialiseOtaManager: (options: Partial<IOptions>) => void;
