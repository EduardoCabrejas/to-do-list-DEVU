export class TaskDto {
    id: string;
    title: string;
    description?: string;
    type: string;
    status: "Pending" | "In-Progress" | "Completed";
    dueDate?: Date;
    priority?: "Low" | "Medium" | "High";
    createdAt: Date;
    updatedAt: Date;
  
    constructor(task: any) {
      this.id = task._id.toString();
      this.title = task.title;
      this.description = task.description;
      this.type = task.type;
      this.status = task.status;
      this.dueDate = task.dueDate;
      this.priority = task.priority;
      this.createdAt = task.createdAt;
      this.updatedAt = task.updatedAt;
    }
  }
  