

export class Aplicante {
    $key?: string;
    file?: File;
    alias?: string;
    employeeId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    url?: string;
    progress?: number;
    createdOn?: Date = new Date();
    constructor(file: File) {
        this.file = file;
    } }
