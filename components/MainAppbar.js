import React from 'react'
import { Appbar, IconButton } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { getHeaderTitle } from '@react-navigation/elements'

export default function MainAppbar(props) {
    const title = (props.options && props.route) ? getHeaderTitle(props.options, props.route.name) : 'Map'

    return (
        <Appbar.Header style={{ backgroundColor: props.backgroundColor }}>
            {props.back ? <Appbar.BackAction onPress={() => props.navigation.goBack()} /> : null}
            <Appbar.Content title={title} />
            {Object.keys(props.mapTypeIcons).map((type) => (
                <IconButton
                    key={type}
                    icon={() => (
                        <MaterialCommunityIcons
                            name={props.mapTypeIcons[type]}
                            size={24}
                            color={type === props.mapType ? 'blue' : 'white'}
                        />
                    )}
                    onPress={() => props.handleMapType(type)}
                />
            ))}
            {props.back ? null : <Appbar.Action icon={props.icon} onPress={props.getUserPosition} />}
            {props.back ? null : <Appbar.Action icon='cog' onPress={() => props.navigation.navigate('Settings')} />}
        </Appbar.Header>
    );
}
