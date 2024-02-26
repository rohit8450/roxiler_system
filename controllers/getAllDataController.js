import App from "../model/InventoryItemModel.js";

export const getAllData = async (req, res) => {
  try {
    const selectedMonth = parseInt(req.params.month);

    const searchQuery = req.query.search;
    const query = searchQuery
      ? {
          month: selectedMonth,
          $or: [
            { title: { $regex: searchQuery, $options: "i" } },
            { description: { $regex: searchQuery, $options: "i" } },
            { price: parseFloat(searchQuery) || 0 },
          ],
        }
      : { month: selectedMonth };

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const [transactions, total] = await Promise.all([
      App.find(query).skip(skip).limit(limit),
      App.countDocuments(query),
    ]);

    const numOfPages = Math.ceil(total / limit);

    res.status(200).json({
      selectedMonth,
      total,
      numOfPages,
      currentPage: page,
      transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
