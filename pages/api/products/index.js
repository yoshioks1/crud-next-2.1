//import Query from "mysql2/typings/mysql/lib/protocol/sequences/Query";
import { pool } from "../../../config/db";
import axios from "axios";

  export default async function handler(req,res){

    switch (req.method) {
        case "GET":
          return await getProducts(req, res);
        case "POST":
          return await saveProduct(req, res);
        default:
          return res.status(201).json(' sms default');
    }
  } 
    
    const saveProduct = async (req, res) => {
      try {
        const { name, description, price } = req.body;
    
        const result = await pool.query("INSERT INTO nx_product SET ?", {
          name,
          description,
          price,
        });
    
        return res.status(200).json({ ...req.body, id: result.insertId });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }

    const getProducts = async (req, res) => {
      try {
        const results = await pool.query("SELECT * FROM nx_product");
        return res.status(200).json(results);
      } catch (error) {
        return res.status(500).json({ error });
      }
    };




    const saveRecord_arrayPhoto2 = async (req, res) => {
      try {
        console.log('hola array photo2');
        const resu = await axios.get("http://universities.hipolabs.com/search");
        console.log(resu);
        
        var number = 0;
        const princiArray = [];
  
        for (var i = 0; i < 1000; i++) {
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

