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

// ── Step 3: Predictions (written BEFORE running any analysis) ──
// Prediction 1: Which day had the most screen time?
//   I predict Wednesday & Thursday (8 hours) — long day, lots of time on the laptop.
// Prediction 2: Best focus day?
//   I predict Wednesday — it was my best night of sleep (7 hours) so focus should be highest.
// Prediction 3: Is more caffeine helping?
//   I predict NO — Thursday had the most caffeine (2 cups) but I still
//   felt stressed and unfocused. Sleep seems to matter more than coffee.

// ── Quick check: print the data so we can verify it loads correctly ──
console.log("Week Data Journal:");
console.table(weekData);

// ── Discovery: Which day had the most screen time? ──
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