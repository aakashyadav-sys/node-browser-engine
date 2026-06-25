class Logger {
    constructor(verbose = false) {
        this.verbose = verbose;
        this.logs = [];
    }

    log(message, data = null) {
        const entry = { level: 'LOG', message, data, timestamp: Date.now() };
        this.logs.push(entry);
        if (this.verbose) {
            console.log(`[LOG] ${message} `, data !== null ? data : "")
        }
    }

    info(message, data = null) {
        const entry = { level: "INFO", message, data, timestamp: Date.now() };
        this.logs.push(entry);
        console.log(`[INFO] ${message}`, data !== null ? data : "")
    }

    success(message, data = null) {
        const entry = { level: "SUCCESS", message, data, timestamp: Date.now() };
        this.logs.push(entry);
        console.log(`[SUCCESS]  ${message}`, data !== null ? data : "");
    }

    warn(message, data = null) {
        const entry = { level: "WARN", message, data, timestamp: Date.now() };
        this.logs.push(entry);
        console.log(`[WARN] ${message}`, data != null ? data : "");
    }

    error(message, data = null) {
        const entry = { level: "ERROR", message, data, timestamp: Date.now() }
        this.logs.push(entry);
        console.log(`[ERROR] ${message}`, data !== null ? data : "")
    }



    getLogs() {
        return this.logs;
    }

    clearLogs() {
        this.logs = [];
    }
}

export default Logger;