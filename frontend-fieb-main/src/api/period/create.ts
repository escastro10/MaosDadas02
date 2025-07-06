import { api } from "@/lib/axios";

export async function createPeriod({ year, cloneFromPeriodId }: { year: number, cloneFromPeriodId: string }) {
    await api.post('/period', {
        year,
        cloneFromPeriodId
    });
}