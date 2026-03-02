import React, { useEffect, useState } from "react";
import CategoryList from "@/components/CategoryList";
import TransactionList from "@/components/transactionList";


function Index() {

  return (
  <div>
    <CategoryList /> <br></br>
    <TransactionList />
  </div>
  )
}

export default Index;