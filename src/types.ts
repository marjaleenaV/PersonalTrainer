export type CustomerItem = {
  firstname: string,
  lastname: string,
  streetaddress: string,
  postcode: string,
  city: string,
  email: string,
  phone: string,
  _links?: {
    self: {
      href: string;
    },
    customer: {
      href: string;
    }
    trainings: {
      href: string;
    }
  }
}

export type TrainingItem = {
  id: number,
  date: string,
  duration: number,
  activity: string,
  customer: {
    firstname: string,
    lastname: string
  }
  /**_links?: {
    self: {
      href: string;
    },
    training: {
      href: string;
    },
    customer: {
      href: string;
    }
  }*/
}
