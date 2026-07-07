// myDataJournal.js
// Weekly data journal — one object per day

const weekData = [
  { day: "Monday",    sleepHours: 6.5, screenTime: 7,   mood: "stressed", caffeineIntake: 1, focusLevel: 7 },
  { day: "Tuesday",   sleepHours: 6,   screenTime: 6.5, mood: "tired",    caffeineIntake: 1, focusLevel: 9 },
  { day: "Wednesday", sleepHours: 7,   screenTime: 8, mood: "okay",     caffeineIntake: 1, focusLevel: 10 },
  { day: "Thursday",  sleepHours: 6,   screenTime: 8,   mood: "stressed", caffeineIntake: 2, focusLevel: 9 },
  { day: "Friday",    sleepHours: 6.5, screenTime: 7.5, mood: "tired",    caffeineIntake: 1, focusLevel: 5 },
  { day: "Saturday",  sleepHours: 7,   screenTime: 6,   mood: "relaxed",  caffeineIntake: 1, focusLevel: 6 },
  { day: "Sunday",    sleepHours: 6.5, screenTime: 7,   mood: "tired",    caffeineIntake: 0, focusLevel: 7 },
];

// ── Quick check: print the data so we can verify it loads correctly ──
console.log("Week Data Journal:");
console.table(weekData);

// ── Discovery: Which day had the most screen time? ──
// Prediction 1: Which day had the most screen time?
//   I predict Wednesday & Thursday (8 hours) — long day, lots of time on the laptop.
function findHighestScreenTime(data) {
  let highest = data[0]; // start by assuming the first day is highest

  for (let i = 1; i < data.length; i++) {
    if (data[i].screenTime > highest.screenTime) {
      highest = data[i];
    }
  }

  // Check for ties (other days matching the highest value)
  const tiedDays = data
    .filter(entry => entry.screenTime === highest.screenTime)
    .map(entry => entry.day);

  return `Highest screen time: ${tiedDays.join(" & ")} (${highest.screenTime} hours)`;
}

console.log(findHighestScreenTime(weekData));

// ── Discovery: Best focus day? ──
// Prediction 2: Best focus day?
//   I predict Wednesday — it was my best night of sleep (7 hours) so focus should be highest.
function findBestFocusDay(data) {
  let best = data[0]; // assume the first day is best to start

  for (let i = 1; i < data.length; i++) {
    if (data[i].focusLevel > best.focusLevel) {
      best = data[i];
    }
  }

  // Handle ties, just like findHighestScreenTime
  const tiedDays = data
    .filter(entry => entry.focusLevel === best.focusLevel)
    .map(entry => entry.day);

  return `Best focus day: ${tiedDays.join(" & ")} (focus level ${best.focusLevel}/10)`;
}

console.log(findBestFocusDay(weekData));

// ── Discovery: Average sleep across the week ──
// Prediction 3: What's the average sleep across the week?
//   I predict around 6.5 hours which is not great, but not terrible either.
function averageSleep(data) {
  let total = 0;

  for (let i = 0; i < data.length; i++) {
    total += data[i].sleepHours;
  }

  const average = total / data.length;

  // toFixed(1) rounds to one decimal place (returns a string, fine for display)
  return `Average sleep: ${average.toFixed(1)} hours per night`;
}

console.log(averageSleep(weekData));

// ── Discovery: Does more caffeine mean better focus? ──
// Prediction 4: Is more caffeine helping?
//   I predict YES. Thursday had the most caffeine (2 cups) but I still
//   felt stressed. Sleep seems to matter more than coffee.
function correlateCaffeineToFocus(data) {
  // Group focus levels by caffeine amount: { 0: [7], 1: [7,9,10,5,6], 2: [9] }
  const focusByCaffeine = {};

  for (let i = 0; i < data.length; i++) {
    const cups = data[i].caffeineIntake;

    if (!focusByCaffeine[cups]) {
      focusByCaffeine[cups] = []; // first time seeing this cup count
    }
    focusByCaffeine[cups].push(data[i].focusLevel);
  }

  // Build one line per caffeine level with its average focus
  let result = "Caffeine vs. focus:\n";

  for (const cups in focusByCaffeine) {
    const levels = focusByCaffeine[cups];
    const avg = levels.reduce((sum, val) => sum + val, 0) / levels.length;
    result += `  ${cups} cup(s): average focus ${avg.toFixed(1)} (${levels.length} day${levels.length > 1 ? "s" : ""})\n`;
  }

  return result;
}

console.log(correlateCaffeineToFocus(weekData));

// GitHub Link for this assignment: https://github.com/47jmerchant/cs81-module4b-mydataexplorer
