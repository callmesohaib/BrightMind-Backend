const { z } = require("zod");
const LoginSchema = z.object({
  email: z
    .string({ required_error: "Please enter email address." })
    .trim()
    .email({ required_error: "Invalid email address." })
    .min(3, { message: "email Address must be at least 3 characters." }),
  password: z
    .string({ required_error: "Please enter password." })
    .trim()
    .min(3, { message: "Password must be at least 3 characters." }),
});

const RegisterSchema = LoginSchema.extend({
  username: z
    .string({ required_error: "Please enter username." })
    .trim()
    .min(3, { message: "Name must be at least 3 characters." }),
  phone: z
    .string({ required_error: "Please enter phone." })
    .trim()
    .min(11, { message: "Phone number must be at least 11 characters." }),
});
module.exports = { LoginSchema, RegisterSchema };
