import App from "../model/InventoryItemModel.js";

export const getStats = async (req, res) => {
  try {
    const { month } = req.params;
    const selectedMonthNumber = parseInt(month);

    const totalSaleAmountPromise = App.aggregate([
      {
        $match: {
          month: selectedMonthNumber,
          sold: true,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" },
        },
      },
    ]);

    const [totalSaleAmountResult, totalSoldItems, totalNotSoldItems] = await Promise.all([
      totalSaleAmountPromise,
      App.countDocuments({ month: selectedMonthNumber, sold: true }),
      App.countDocuments({ month: selectedMonthNumber, sold: false }),
    ]);

    const totalSaleAmount = totalSaleAmountResult[0]?.totalAmount || 0;

    res.status(200).json({
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
