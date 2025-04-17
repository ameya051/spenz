import { Inngest } from "inngest";

interface RetryConfig {
    delay: number;
    maxAttempts: number;
}

interface InngestConfig {
    id: string;
    name: string;
    retryFunction: (attempt: number) => Promise<RetryConfig>;
}

export const inngest = new Inngest<InngestConfig>({
    id: 'spenz',
    name: 'Spenz',
    retryFunction: async (attempt: number) => ({
        delay: Math.pow(2, attempt) * 1000, // Exponential backoff
        maxAttempts: 2,
    }),
})
