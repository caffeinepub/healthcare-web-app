import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    age: bigint;
    isPriority: boolean;
    name: string;
    uniqueId: string;
    timestamp: bigint;
}
export interface backendInterface {
    addAppointment(booking: Booking): Promise<void>;
    getAllBookings(): Promise<Array<Booking>>;
}
