import React from 'react';

const descriptionContent = {
    Scalping: {
        title: "Scalping 🚀",
        description: "Scalping is a web application that functions as an intermediary platform between investors and the stock market. Its primary purpose is to facilitate the buying and selling of stocks for investors. The term Scalping refers to a trading strategy in which traders buy and sell stocks quickly, seeking to make small profits on each trade. Scalping offers various convenient features for investors to buy and sell stocks."
    },
    Option: {
        title: "Option 📈",
        description: "Unlock the potential of options trading with the revolutionary Option Strategy Application. Designed to simplify and automate the execution of option strategies, our application empowers traders with convenience and efficiency. Automated Option Strategies: Say goodbye to manual execution and let our application handle it for you. With 20 pre-built option strategies at your fingertips, you can easily select and execute the strategies that align with your trading goals and risk appetite."
    },
    Candlestick: {
        title: "Candlestick 🔥",
        description: "The Candlestick Pattern Application is a powerful tool designed for market research and trading analysis through the observation of chart and candlestick patterns. This application employs historical price data to identify various candlestick patterns, such as doji, hammer, engulfing, and more, within different timeframes. The application's main objective is to assist traders and researchers in gaining insights into market trends, potential reversals, and momentum shifts. It automatically detects and highlights candlestick patterns on price charts, enabling users to quickly spot key formations that often signify significant price movements."
    }
};

const DiscriptionData = ({ Type }) => {
    const content = descriptionContent[Type] || {};  // Default empty object to prevent errors if Type doesn't match

    return (
        <div>
            <h2>{content.title}</h2>
            <p>{content.description}</p>

            <div className="description-section">
                <h4>Profile 📝</h4>
                <p>
                    Profile contains all your personal information which you enter while signing up an account including Mobile number, Email address, and selected Broker. You can also change your account password on the Profile page.
                </p>

                <h4>Broker Credentials 💼</h4>
                <p>In order to buy or sell stocks using the Trading web application, users can fill in the necessary broker credentials to facilitate the transaction.</p>
                <ul>
                    <li>User can select a broker.</li>
                    <li>User can fill in the broker username.</li>
                    <li>User can fill in the App API key.</li>
                    <li>Then continue trading.</li>
                </ul>

                <h4>Add Script Parameter 🛠️</h4>
                <p>Scalping:</p>
                <ul>
                    <li>
                        <strong>Single Script:</strong> Users can choose a measurement type (percentage or points) to set their booking and re-entry points. If users opt for the percentage measurement, these points are based on the asset's price, or fixed points if the point measurement is chosen.
                    </li>
                    <li>
                        <strong>Fixed Price:</strong> Users can set a specific price at which they want to buy or sell an asset, with an option to set an entry range for automatic execution.
                    </li>
                    <li>
                        <strong>One Directional:</strong> In this strategy, users set a Fixed point and Target point. The software continuously averages the position based on the Target point, and exits all positions when the Fixed point is reached.
                    </li>
                </ul>

                <h4>Steps to Add Script 📝</h4>
                <ol>
                    <li>User selects market options and their respective Instrument (if any), followed by options like Symbol type, Expiry date, Option type, Strike price, etc.</li>
                    <li>User selects buy or sell options as per preference.</li>
                    <li>User sets the value for booking and re-entry points in percentage or points.</li>
                    <li>User enters the quantity of stocks they are willing to trade.</li>
                    <li>User selects Trade execution: Paper trade or Live trade (Paper trade is for non-real-money practice, while Live trade involves real money).</li>
                    <li>User sets the lowest and highest price range within which they are expecting to hold or exit the trade.</li>
                </ol>

                <h4>Update Script Parameter 🔄</h4>
                <p>Update script allows users to modify or change previously entered information:</p>
                <ul>
                    <li>User can update script details as needed.</li>
                    <li>Changes are saved by clicking the Submit button.</li>
                </ul>

                <h4>Discontinue Trading ❌</h4>
                <p>This option allows the user to stop trading with a specific symbol:</p>
                <ul>
                    <li>User selects the trade symbol they wish to discontinue.</li>
                    <li>User clicks on Submit to stop the trade.</li>
                </ul>

                <h4>Continue Trading ▶️</h4>
                <p>This option allows users to resume previously discontinued trades:</p>
                <ul>
                    <li>User selects the trade symbol they wish to continue.</li>
                    <li>User clicks on Submit to resume the trade.</li>
                </ul>

                <h4>Square Off ⬇️</h4>
                <p>This feature permanently deletes a specific trade from the software.</p>

                <h4>Trading Report 📊</h4>
                <p>Scalping web application has a feature to generate a report of all trades performed by the user.</p>

                <h4>Trading History 📅</h4>
                <p>Trading history shows all trades, including entry and exit prices, profit and loss, and cumulative P&L.</p>

                <h4>Trade Response 📡</h4>
                <p>This feature provides clear responses from the broker confirming trade completion or status.</p>
            </div>
        </div>
    );
};

export default DiscriptionData;
