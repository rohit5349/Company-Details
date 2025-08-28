import express from "express";
import { signUp , login } from "../controller/auth.js";
import { UpdateUser , deleteUser , getUser} from "../controller/user.js";

const router = express.Router();

router.post('/signup' , signUp);
router.post('/login' , login);



router.get('/' , (req , res)=>{
      res.send("hello routes user");
})

router.get("/:id" , getUser);
router.put("/:id" , UpdateUser);
router.delete("/:id" , deleteUser)

export default router;