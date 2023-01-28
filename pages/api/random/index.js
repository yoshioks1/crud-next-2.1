import { pool } from "../../../config/db";
import axios from "axios";

  export default async function handler(req,res){

    switch (req.method) {
        case "GET":
          return await getProductCount(req, res);
        case "POST":
          return await saveProduct_arrayUniv(req, res);
        default:
          return res.status(201).json(' sms default');
    }
  } 
    


  const getProductCount = async (req, res) => {
    try {
      const results = await pool.query("SELECT Count(*) as rownum FROM nx_product");
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };


  const saveProduct_arrayUniv = async (req, res) => {
    try {
      const resu = await axios.get("http://universities.hipolabs.com/search?country=Argentina");
      var number = 0;
      const princiArray = [];

      for (var i = 0; i < 10; i++) {
          number++;           
          const unis_array = ([
            resu.data[number].name,
            resu.data[number]["state-province"] + ' ' + number,
            number,
          ]);
          princiArray.push(unis_array);     
      }//loop number  
      console.log(princiArray);
          
      const result = await pool.query("INSERT INTO nx_product (name, description, price) VALUES  ?",[princiArray]);
      return res.status(200).json({ ...req.body, id: result.insertId });
      
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }