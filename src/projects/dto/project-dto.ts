export interface CreateProjectDto {
  clientName: string;
  img?: string[];
  title: string;
  description?: string;
  type: string;
  projectClient?: string;
  project_date?: string;
}