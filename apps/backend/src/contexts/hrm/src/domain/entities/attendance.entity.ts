export interface IAttendance {
    id?: string;
    staff: string;
    date: Date;
    checkIn: Date;
    checkOut?: Date;
    status: 'present' | 'late' | 'half-day' | 'absent';
    notes?: string;
    organization: string;
    businessUnit: string;
}
