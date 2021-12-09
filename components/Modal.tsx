import React from 'react'
import { StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements'

interface props {
visible: boolean,
setVisible: any,
children : any

}

export default function Modal({ visible, setVisible, children } : props) {
    return (
        <Overlay
            isVisible={visible}
            animationType='fade'
            overlayStyle={styles.overlay}
            onBackdropPress={() => setVisible(false)}
        >
            {
                children
            }

        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay: {
        width: "95%"
    }
})