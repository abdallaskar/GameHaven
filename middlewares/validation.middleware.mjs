import { body } from "express-validator";

export const validationSchema = () => {
  return [
    body("totalPrice")
      .notEmpty()
      .withMessage("Total Price is Required")
      .isNumeric()
      .withMessage("Total Price must be a number"),
    body("items")
      .isArray({ min: 1 })
      .withMessage("Items must be a non-empty array"),
    body("items.*.title")
      .notEmpty()
      .withMessage("Each item must have a title")
      .isLength({ min: 3 })
      .withMessage("Each title must be at least 3 characters long"),
    body("items.*.quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be a positive number"),
    body("items.*.price").isNumeric().withMessage("Price must be a number"),
  ];
};


