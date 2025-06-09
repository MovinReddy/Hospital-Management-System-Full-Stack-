export interface Doctor {
    doctorId: number; // optional for new doctors
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    specialization: string;
    qualifications: string;
    experienceYears: number;
    photoURL: string;
  }
  