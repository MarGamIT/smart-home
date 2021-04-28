export abstract class AbstractLogger {

    // logs info message
    public abstract logInfo(message: string): void;

    // logs error message
    public abstract logError(message: string): void;
}