import logo from './company.jpg';
import Hero from './Hero.jpg';
import capgemini from './capgemini.jpeg';
import flipkart from './flipkart.jpeg';
import google from './Google.jpeg';
import infosys from './Infosys.jpeg';
import microsoft from './MicroSoft.jpeg';
import tcs from './tcs.jpeg';
import wipro from './wipro.jpeg';
import zomato from './zomato.jpeg';


export const assets = {
    logo,
    Hero,
    capgemini,
    flipkart,
    google,
    infosys,
    microsoft,
    tcs,
    wipro,
    zomato,
}

 const ImageData = [
     {
        name : "capgemini",
        image : assets.capgemini,
        industry: "IT Services & Consulting",
        founded: "1967",
        headquarters: "Paris, France",
        employees: "340,000+",
        revenue: "$22 Billion (approx.)",
        description: "Capgemini is a global leader in consulting, technology services, and digital transformation, helping clients to harness the power of technology to achieve business goals.",
     },

     {
        name : "Flipkart",
        image : assets.flipkart,
        industry : "E-commerce & Retail",
        founded : "2007",
        headquarters : "Bengaluru, India",
        employees : "50,000+",
        revenue : "$6.1 Billion (approx.)",
        description : "Flipkart is one of India’s leading e-commerce companies, offering a wide range of products from electronics to fashion and groceries.",
     },

     {
       name : "Google",
       image : assets.google,
       industry : "Technology & Internet Services",
       founded : "1998",
       headquarters : "Mountain View, California, USA",
       employees : "180,000+",
       revenue : "$305.6 Billion (2023)",
       description : "Google is a global technology leader specializing in internet-related services and products such as search, advertising, cloud computing, software, and hardware.",
     },

     {
        name : "Infosys",
        image : assets.infosys,
        industry : "IT Services & Consulting",
        founded : "1981",
        headquarters : "Bengaluru, India",
        employees : "343,000+",
        revenue : "$18.5 Billion (2023)",
        description : "Infosys is a global leader in next-generation digital services and consulting, helping clients in over 50 countries to navigate digital transformation.",
     },

     {
       name : "Microsoft",
       image : assets.microsoft,
       industry : "Technology",
       founded : "1975",
       headquarters : "Redmond, Washington, USA",
       employees : "220,000+",
       revenue : "$238 Billion (2023)",
       description : "Microsoft is a multinational technology company offering software, hardware, cloud solutions, and services, best known for Windows, Office, Azure, and Xbox.",
     },

     {
         name : "TCS",
         image : assets.tcs,
         industry : "IT Services & Consulting",
         founded : "1968",
         headquarters : "Mumbai, India",
         employees : "600,000+",
         revenue : "$29 Billion (2023)",
         description : "TCS is a global leader in IT services, consulting, and business solutions, and the largest IT services company in India.",
     },

     {
        name : "Wipro",
        image : assets.wipro,
        industry : "IT Services & Consulting",
        founded : "1945",
        headquarters : "Bengaluru, India",
        employees : "250,000+",
        revenue : "$11.2 Billion (2023)",
        description : "Wipro is a leading global information technology, consulting, and business process services company.",
     },

     {
        name : "Zomato",
        image : assets.zomato,
        industry : "Food Delivery & Technology",
        founded : "2008",
        headquarters : "Gurugram, India",
        employees : "5,000+",
        revenue : "$1.2 Billion (2023)",
        description : "Zomato is a leading Indian multinational restaurant aggregator and food delivery company, connecting millions of customers with restaurants across the world.",
     }
];

export default ImageData;