/*
  Numbers for the watering guide (#/water). The words are in js/i18n.js ("water.*").
  days: [fewest, most] days between waterings; depth: [min, max] inches to wet.
  Seasons follow the Phoenix-area chart (Landscape Watering by the Numbers):
  spring Mar-May, summer May-Oct, fall Oct-Dec, winter Dec-Mar.
  Citrus intervals are from Irrigating Citrus Trees (AZ1151), by tree age.
*/
window.WATERING = {
  seasons: ["spring", "summer", "fall", "winter"],
  // Which season column to highlight in each month (January first). The chart's seasons
  // share their edge months; this follows the Extension's monthly reminders, which switch
  // schedules in March, May, October and December.
  seasonOfMonth: ["winter", "winter", "spring", "spring", "summer", "summer", "summer", "summer", "summer", "fall", "fall", "winter"],
  rows: [
    { id: "vegetables", days: [[3, 7], [2, 5], [3, 7], [5, 10]], depth: [8, 12] },
    { id: "fruitTrees", days: [[7, 12], [7, 10], [7, 12], [14, 30]], depth: [24, 36] }
  ],
  // Columns of the citrus table: first and last month (1 = January).
  citrusPeriods: [[12, 2], [3, 4], [5, 6], [7, 9], [10, 11]],
  citrus: [
    { age: "newest", allYear: [2, 3] },
    { age: "new", allYear: [3, 5] },
    { age: "young", days: [[14, 14], [7, 10], [5, 7], [2, 5], [5, 10]] },
    { age: "twoYears", days: [[14, 21], [10, 14], [7, 10], [7, 10], [10, 14]] },
    { age: "mature", days: [[21, 30], [14, 21], [14, 14], [10, 14], [14, 21]] }
  ],
  sources: ["watering-numbers", "az1435", "az1151", "reminders-apr", "reminders-may", "reminders-jun", "reminders-aug", "reminders-nov"]
};
