declare global {
    namespace NodeJS {
        interface ProcessEnv {
            USER_EMAIL: string
            USER_PASSWORD: string
        }
    }
}

export {}