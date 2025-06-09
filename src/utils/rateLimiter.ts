export class RateLimiter {
    private queue: (() => Promise<unknown>)[] = [];
    private processing = false;
    private requestsPerSecond = 9;
    private lastRequestTime = 0;

    async add<T>(fn: () => Promise<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            this.queue.push(async () => {
                try {
                    const result = await fn();
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });

            if (!this.processing) {
                this.processQueue();
            }
        });
    }

    private async processQueue() {
        if (this.queue.length === 0) {
            this.processing = false;
            return;
        }

        this.processing = true;
        const now = Date.now();
        const timeSinceLastRequest = now - this.lastRequestTime;
        const minTimeBetweenRequests = 1000 / this.requestsPerSecond;

        if (timeSinceLastRequest < minTimeBetweenRequests) {
            await new Promise(resolve => 
                setTimeout(resolve, minTimeBetweenRequests - timeSinceLastRequest)
            );
        }

        const nextRequest = this.queue.shift();
        if (nextRequest) {
            this.lastRequestTime = Date.now();
            await nextRequest();
        }

        // Process next request in queue
        setTimeout(() => this.processQueue(), 0);
    }
}

// Create a singleton instance
export const rateLimiter = new RateLimiter(); 