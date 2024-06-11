import { MovieSchedule } from "./movieSchedule.class";
import { Projection } from "../projection/projection.class";
import { ProjectionDTO } from "../projection/projectionDTO.interface";

export interface MovieScheduleByDays {

    monday: ProjectionDTO[],
    tuesday: ProjectionDTO[],
    wednesday: ProjectionDTO[],
    thursday: ProjectionDTO[],
    friday: ProjectionDTO[],
    satruday: ProjectionDTO[],
    sunday: ProjectionDTO[]
  
  }