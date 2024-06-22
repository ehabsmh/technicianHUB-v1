import { hashSync } from "bcrypt";
import User from "../models/users.js";

export const createUser = (role, reqBody) => {
  const { firstName, lastName, email, password, phone, address,
    birthDate, picture } = reqBody;

  const requiredFields = [
    "firstName", "lastName", "email", "password", "phone",
    "address", "birthDate", "role"
  ];

  const emptyField = requiredFields.find(field => !reqBody[field]);

  if (emptyField) {
    return emptyField;
  }
  const saltRounds = 10;
  const [mm, dd, yyyy] = birthDate.split('-');

  // Hash the password
  const hashed_pw = hashSync(password, saltRounds);

  const user = {
    firstName, lastName, email, password: hashed_pw,
    phone, address, birthDate: new Date(yyyy, mm, dd),
    role, picture
  }

  if (role === 'user') {
    user.customerDetails = {};
    user.customerDetails.assignedTechIds = [];
  }

  if (role === 'technician') {
    user.technicianDetails = reqBody.technicianDetails;
    if (!user.technicianDetails.service) return 'service';
    if (!user.technicianDetails.salary) return 'salary';
    if (!user.technicianDetails.bio) return 'bio';
  }

  const newUser = new User(user);

  return newUser;
}
