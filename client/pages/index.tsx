import React, { useEffect, useState } from "react";
import CategoryList from "@/components/CategoryList";
import TransactionList from "@/components/transactionList";
import Title from "@/components/Title";


function Index() {

  return (
  <div>
    <Title /> <br></br>
    <CategoryList /> <br></br>
    <TransactionList /> <br></br>
  </div>
  )
}

export default Index;