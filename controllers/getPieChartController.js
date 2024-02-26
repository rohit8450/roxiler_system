import App from "../model/InventoryItemModel.js";

export const getPieChart = async (req, res) => {
  try {
    const selectedMonthNumber = parseInt(req.params.month);

    const items = await App.find({ month: selectedMonthNumber });

    const categoryCounts = items.reduce((counts, item) => {
      const category = item.category;
      counts[category] = (counts[category] || 0) + 1;
      return counts;
    }, {});

    res.status(200).json(categoryCounts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
