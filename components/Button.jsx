import React from 'react'
import { View, Text, Pressable } from 'react-native'

interface TitleProp {
    title: string,

}

export default function Button({ title }: TitleProp) {
    return (
        <Pressable
            style={({ pressed }) => [{ opacity: pressed ? .5 : 1, backgroundColor: '#00709e', height: 38, alignItems: 'center', justifyContent: 'center', borderRadius: 14, marginTop: 20 }]}>
            <Text style={{ color: '#fff', fontSize: 19 }}>{title}</Text>
        </Pressable>
    )
}
