import { AbstractLogger } from "./abstract-logger";

export class ConsoleLoggerService extends AbstractLogger {

    // logs info message
    public logInfo(message: string): void {
        console.info(message);
    }
    
    // logs error message
    public logError(message: string): void {
        console.error(message);
    }
}