import React from 'react'
import { Layout } from "../components/Layout";

import { TaskContext } from "../context/taskContext";
import { useContext } from "react";


function About() {
  const { hello } = useContext(TaskContext);
  console.log(hello);


  return (
    <Layout>
        <div>about</div>   
    </Layout>
    
  )
}

export default About