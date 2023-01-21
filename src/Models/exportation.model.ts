import { Container } from "./container.model";

export interface Exportation {
    numero_do: string,
    empresa: string
    reserva: string
    containers? : Container[]
}