export type Volumen = 20 | 40

export interface Container {
  numero_do: string
  numero_contenedor: string
  volumen: Volumen
  tara: number
  naviera: string
  Sellos: string
  Destino: string
  ETA: string
  Material: string
  createdAt: string
}
