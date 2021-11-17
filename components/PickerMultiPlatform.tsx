import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

export default function PickerMulti(opcionesA: any[]) {
    const [state, setState] = React.useState("");
    if(Platform.OS === "android") {
        return(
            <Picker
                selectedValue={state}
                onValueChange={(value, index) => setState(value)}
                mode="dropdown" // Android only
                style={styles.picker}
                >
                {opcionesA.map((i, index) => 
                    <Picker.Item key={index} label={i.label} value={i.value} />
                )}
            </Picker>
        );
    } else {
        return (
            <Picker
            selectedValue={state}
            onValueChange={(value, index) => setState(value)}
            style={styles.picker}
            >
            {opcionesA.map((i, index) => 
                <Picker.Item key={index} label={i.label} value={i.value} />
            )}
        </Picker>
        );
    }
}

const styles = StyleSheet.create({
    picker: {
        marginVertical: 30,
        width: 300,
        padding: 10,
        borderWidth: 1,
        borderColor: "#666",
    },
});