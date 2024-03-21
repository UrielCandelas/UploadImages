import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button } from 'react-native';
//import { Image } from 'expo-fast-image';

import { useApp } from '../context/AppContext';

export default function AppContent() {
  const { getImage, data, setData } = useApp();

  return (
    <View style={styles.container}>
      <Button title="Cargar imagen" onPress={() => getImage()} />
      <ScrollView>
        {data && data.map((element, i) => (
          <View key={i}>
            <Text>{element.name}</Text>
            <Text>{element.lastName}</Text>
            {element.image ? (
              <Image
                key={i}
                source={{ uri: `data:image/webp;base64,${element.image}` }}
                style={styles.image}
                resizeMode="contain"
                cache="reload"
              />
            ) : (
              <Text>No hay imagen</Text>
            )}

          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "20%",
    marginBottom: "20%",
  },
  image: {
    width: 100,
    height: 200,
  },
});