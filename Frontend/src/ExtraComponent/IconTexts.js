export const text = {
    lowerPrice: "Enter the lower price range at which you want to buy/sell a stock. Used to take a trade when the stock moves above this range.",
  
    higherPrice: "Enter the higher price range at which you want to buy/sell a stock. Used to take a trade when the stock moves below this range.",
  
    uniqueId: "Use different Unique IDs when taking multiple entries for the same stock.",
  
    tradeCount: "Used to take multiple trades on the same day for the same stock or index.",
  
    firstTradeLowerRange: "The minimum price level at which you want to initiate your first buying/selling position.",
  
    firstTradeHigherRange: "The maximum price level at which you want to initiate your first buying/selling position.",
  
    lowerRange: "The minimum price level below which no new positions will be created; acts as an overall stop-loss in buying conditions.",
  
    higherRange: "The maximum price level above which no new positions will be created; acts as an overall stop-loss in selling conditions.",
  
    stepUp: "Systematically increase the quantity of re-entries in defined batches.",
  
    incrementType: "Defines how the quantity increases after each step-up (e.g., Addition-wise, Multiplication-wise).",
  
    incrementValue: "Sets the rate of quantity increase based on the selected increment type.",
  
    strikeType:  `Used to select OTM or ITM strike of the selected index.
    depthOfStrike:  If Depth of Strike (DOS) = 1, then it selects 1 OTM of both CE and PE. 
  
    premiumRange:  Directly specify the premium range that you want to buy/sell. 
  
    straddleWidth:  Used to select desired CE and PE based on the width of premium. 
  
    percentOfATM:  The entered % of ATM is calculated to determine the OTM strike price.`,
  
    riskHandle: "Defines how targets and stop-losses are applied to exit positions:\n\nFuture – Applied on the future price of the selected index.\n\nLeg-wise – Applied individually on each premium (CE & PE).\n\nPremium Addition – Applied on the combined value of all premiums.",

  
    positionType: "Defines re-entry behavior. 'Single' allows one entry with no re-entries. 'Multiple' enables multiple re-entries for the same position.",
  
    measurementType: "Defines how target and stop-loss are set: use 'Point' for fixed values or 'Percentage' for percentage-based values.",
  
    targetType: `Defines how you want to exit your positions.
  
    fixedTarget:  All re-entries exit at the same target. 
  
    entryWiseTarget:  Each re-entry has its own target. 
  
    averageTarget:  Positions exit at the average of all entry prices. 
  
    entryWiseSL:  Works in reverse: takes a re-entry on target hit and exits on stop-loss.` ,
  
    repeatationCount: "Specifies how many re-entries are allowed after the initial position.",
  
    holdOrExit: "Choose whether to hold your current positions or exit all of them.",
  
    continueAfterCycleExit: "If true, new entries are allowed after all previous positions have exited. If false, no new entries will be made.",
    NoOfCycyle : "Specifies how many times you want to make new entries after all previous positions have exited.",
    TradeCountPattern: "Specifies how many times you want to make new entries after all previous positions have exited",

    MeasurementType : `It defines how target and stoploss are set. Choose 'Point' to apply them in fixed points, or 'Percentage' to apply them as a percentage of the stock price.`
  
  };
  
  
  