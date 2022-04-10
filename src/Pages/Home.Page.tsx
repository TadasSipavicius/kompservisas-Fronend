import { Stack } from '@fluentui/react';
import React from 'react';
import { styles } from '../Styling/Pages/HomePage.Styling';
import CustomerOrderHomePageContainer from '../Components/CustomerOrder/View/HomePage/CustomerOrderHomePageContainer'
export default function HomePage() {

    return (
        <Stack style={styles.homePageContainer}>
            <CustomerOrderHomePageContainer />
            Home Page
        </Stack>
    )
}