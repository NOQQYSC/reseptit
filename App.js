import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, View, Button, Image } from 'react-native';

export default function App() {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data.meals);
    } catch (error) {
      Alert.alert('Error', error);
    };
  }

  function listSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  function Empty() {
    return (
      <Text style={styles.list}>No recipes found</Text>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        keyExtractor={(item) => String(item.idMeal)}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>{item.strMeal}</Text>
              <Image
                style={{ width: 50, height: 50}}
                source={{
                  uri: `${item.strMealThumb}`,
                }}
              />
            </View>
          );
        }}
        ItemSeparatorComponent={listSeparator}
        ListEmptyComponent={Empty}
        data={recipes}
      />

      <View>
        <TextInput
          style={styles.input}
          value={search}
          placeholder="Ingridient"
          onChangeText={(text) => setSearch(text)}
        />
        <Button title="Find" onPress={getRecipes} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input : {
    width:200  , 
    borderColor: 'gray', 
    borderWidth: 1
    
  },

  list: {
    flex: 1,
    marginTop: 50,
    marginLeft: '5%'
  }
});
