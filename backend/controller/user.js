import {User , Company} from '../models/user.js';


export const getUser = async (req , res , next)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch(error){
        next(error);
    }
};

export const UpdateUser = async (req , res , next)=>{
    try{
      const Updateuser = await User.findByIdAndUpdate(
             req.params.id,
             {$set : req.body},
             {new : true}
      );
      res.status(200).json(Updateuser);
    }catch(error){
         next(error);
    }
};


export const deleteUser = async (req , res , next)=>{
    try{
      const Deleteuser = await User.findByIdAndDelete(
          req.params.id
      );
      res.status(200).json("User has been deleted:");
    } catch(error){
         next(error);
    }
}


export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching companies", error: err });
  }
};


export const getCompany = async (req , res , next)=>{
    try{
        const company = await Company.findById(req.params.id);
        res.status(200).json(company);
    } catch(error){
        next(error);
    }
};

export const UpdateCompany = async (req , res , next)=>{
    try{
      const Updatecompany = await Company.findByIdAndUpdate(
             req.params.id,
             {$set : req.body},
             {new : true}
      );
      res.status(200).json(Updatecompany);
    }catch(error){
         next(error);
    }
};


export const deleteCompany = async (req , res , next)=>{
    try{
      const deleteCompany = await Company.findByIdAndDelete(
          req.params.id
      );
      res.status(200).json("User has been deleted:");
    } catch(error){
         next(error);
    }
}