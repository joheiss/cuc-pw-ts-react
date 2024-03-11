import { faker } from "@faker-js/faker";

export const randomInputTypes = ["email", "name", "password", "street", "city", "phoneNumber"] as const;
export type RandomInputType = (typeof randomInputTypes)[number];

export const getRandomData = (randomInputType: RandomInputType): string => {
  switch (randomInputType) {
    case "name":
      return randomFullname();
    case "email":
      return randomEmail();
    case "password":
      return randomPassword();
    case "street":
      return randomStreet();
    case "city":
      return randomCity();
    case "phoneNumber":
      return randomPhoneNumber();
    default:
      return "";
  }
};

const randomEmail = (): string => {
  return faker.internet.email({ provider: "frickelberger.com" });
};

const randomPassword = (): string => {
  return faker.internet.password({ length: 12, memorable: true });
};

const randomFullname = (): string => {
  return faker.person.fullName({ sex: "male" });
};

const randomStreet = (): string => {
  return faker.location.street();
};

const randomCity = (): string => {
  return faker.location.city();
};

const randomPhoneNumber = (): string => {
  return faker.phone.number();
};
