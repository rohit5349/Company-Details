import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
      username : {
           type : String,
           required : true,
           trim     : true,
      },

      email : {
           type : String,
           required : true,
           trim     : true,
           unique   : true,
      },

      password : {
         type : String,
         required : true,
      },
} , {
    timestamps : true,
});



const companySchema = new mongoose.Schema({
        companyname : {
            type : String,
            required : true,
            trim     : true,
        },
        
        industry : {
            type : String,
            required : true,
            trim : true,
        },

        founded : {
             type : Number,
        },

        headquarters : {
             type : String,
             trim : true,
        },

        employees : {
            type : Number,
        },

        revenue : {
            type : String,
            trim : true,
        },

        description : {
            type : String,
            trim : true,
        },
} , {
    timestamps : true,
});

const User = mongoose.model("User" , userSchema);
const Company = mongoose.model("Company" , companySchema);

export {User , Company};