import express from "express";
import { getCompanies,  getCompany , UpdateCompany , deleteCompany } from "../controller/user.js";
import { company } from "../controller/auth.js"; 

const router = express.Router();

router.post('/company' , company);

router.get("/:id" , getCompany);
router.get("/", getCompanies);
router.put("/:id" , UpdateCompany);
router.delete("/:id" , deleteCompany);

export default router;

