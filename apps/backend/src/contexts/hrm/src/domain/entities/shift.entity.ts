export interface IShift {
    id?: string;
    name: string;
    startTime: string; // HH:mm format
    endTime: string; // HH:mm format
    gracePeriod: number; // in minutes
    organization: string;
    businessUnit: string;
}
