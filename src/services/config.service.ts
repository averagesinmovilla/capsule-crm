export class ConfigService {
    static get backendURL(): string {
        return process.env.NEXT_PUBLIC_API_BASE_URL || '';
    }

    static get apiUrl(): string {
        return `${ConfigService.backendURL}/api`;
    }
}
