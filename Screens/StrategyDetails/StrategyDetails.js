// ViewModel.js

import React, { useState } from 'react';
import StrategyDetailsView from './StrategyDetailsView';
import Colors from '../../utils/colors';
import CustomHeaderClose from '../../Components/CustomHeaderClose';

const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
        {
            data: [10, 15, 20, 30],
            color: (opacity = 1) => `rgba(225, 225, 225, ${opacity})`,
            strokeWidth: 4,
        },
    ],
};

const strategyData = {
    title: 'ETH/USDT',
    price: '$233,403',
    percentageChange: '+ 6.24%',
};

const infoData = {
    title: 'Info',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
};

const chartConfig = {
    backgroundGradientFrom: Colors.Secondary_theme, // Background color
    backgroundGradientTo: Colors.Secondary_theme, // Background color
    color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // Green line color
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Label color
    strokeWidth: 4, // Line width
    propsForDots: {
        r: "6",
        strokeWidth: "1",
        stroke: "#2F8438", // Green stroke color for dots
    },
};

const StrategyDetails = ({ navigation, route }) => {
    const [subscribed, setSubscribed] = useState(false);

    const { StrategyId } = route.params;
    const { bot_title } = route.params;
    const { strategy_price } = route.params;

    const handleSubscribe = () => {
        setSubscribed(true);
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <CustomHeaderClose title={bot_title} />
        });
    }, [navigation]);

    return (
        <StrategyDetailsView
            navigation={navigation}
            chartData={chartData}
            strategyData={strategyData}
            infoData={infoData}
            chartConfig={chartConfig}
            subscribed={subscribed}
            onSubscribe={handleSubscribe}
            StrategyId={StrategyId}
            strategy_price={strategy_price}
        />
    );
};

export default StrategyDetails;
