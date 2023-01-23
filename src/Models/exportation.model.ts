import { Container } from "./container.model";

export interface Exportation {
    numero_do: string
    empresa: string
    factura: string
    reserva: string
    CP: string
    estado: string
    containers? : Container[],
    saex?: string
    BL?: string
    dex?: string
    createdAt: string
}