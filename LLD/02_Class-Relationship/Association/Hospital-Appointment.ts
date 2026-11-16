class Doctor {
  private appointments: Appointment[] = [];

  constructor(
    private name: string,
    private specialization: string,
  ) {}

  // addAppointment(){}
  // getPatients(){}
  // getName(){}
  // getSpecialization(){}
  // getAppointments(){}
}

class Patient {
  private appointments: Appointment[] = [];

  constructor(name: string) {}

  // addAppointment(){}
  // getDoctors(){}
  // getName(){}
  // getAppointments(){}
}

class Appointment {
  constructor(
    private doctor: Doctor,
    private patient: Patient,
    private room: Room,
    private time: string,
  ) {}

  //   getDoctor(){}
  //   getPatient(){}
  //   getRoom(){}
  //   getTime(){}
}

class Room {
  constructor(
    private number: string,
    private floor: number,
  ) {}

  // getNumber(){}
  // getFloor(){}
}
