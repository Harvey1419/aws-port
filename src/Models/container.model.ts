import { Status } from "./status.model"

export type Volumen = 20 | 40

export interface Container {
  numero_do: string
  numero_contenedor: string
  estado: string
  volumen: Volumen
  tara: number
  naviera: string
  sellos: string
  destino: string
  ETA: string
  material: string
  createdAt: string
  historico: Status[]
}
