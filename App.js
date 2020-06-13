import React , {useState, useEffect} from 'react';
import {SafeAreaView, FlatList, StyleSheet, View, Text} from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';


function Item ({nombre, direccion}){
  return (
      <View style={styles.item}>
        <Text style={styles.info}>{nombre}</Text>
        <Text style={styles.info}>{direccion}</Text>
      </View>
  );
}

export default function App(){

  const [lista, setLista] = useState([]);
 
const listar = async () => {
 try {
  const res = await axios.get('https://app-solution.000webhostapp.com/profesor.php');
     setLista(res.data)
     console.log(res.data)      
    } catch (error) {
     console.log(error)
   }
}

useEffect(() => {
    listar();
},[])

  return (
 <SafeAreaView style={styles.container}>
   <FlatList 
     data={lista}
     renderItem={({item}) =><Item nombre={item.nombre} direccion={item.direccion}/>}
     keyExtractor={item => item.id}
   />
 </SafeAreaView>     

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:Constants.statusBarHeight,
  },
  item: {
      backgroundColor:'#f9c2ff',
      padding:20,
      marginVertical:8,
      marginHorizontal:16
  },
  info:{
     fontSize:32
  }

});
