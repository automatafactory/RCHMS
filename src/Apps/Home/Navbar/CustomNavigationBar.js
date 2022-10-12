import { Appbar } from 'react-native-paper';

function CustomNavigationBar({ titel }) {
    return (
        <Appbar.Header>
            <Appbar.Content title={titel ? titel : " "} />
        </Appbar.Header>
    );
}