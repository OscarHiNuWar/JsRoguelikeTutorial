import { Entity } from "../entities";

export interface BaseComponent {
  entity: Entity | null;
}
