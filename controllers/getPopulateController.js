import fetch from "node-fetch";
import App from '../model/InventoryItemModel.js';

export const getPopulate = async (req, res) => {
  try {
    const response = await fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data, status: ${response.status}`);
    }

    const data = await response.json();
    
    const itemsToInsert = data.map((item) => ({
      ...item,
      month: new Date(item.dateOfSale).getMonth() + 1,
    }));

    await App.insertMany(itemsToInsert);

    res.status(200).json({ message: "Data populated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
