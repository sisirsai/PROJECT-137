import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      url: 'http://127.0.0.1:5000/',
    };
  }
  componentDidMount() {
    this.getstars();
  }
  getstars = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then((response) => {
        return this.setState({
          listData: response.data.Data,
        });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item, index }) => {
    <ListItem
      key={index}
      title={`Star : ${item.name}`}
      subtitle={`Distance from earth : ${item.distance}`}
      titleStyle={styles.title}
      containerStyle={styles.listContainer}
      bottomDivider
      chevron
      onPress={() =>
        this.props.navigation.navigate('Details', { star_name: item.name })
      }
    />;
  };
  render() {
    console.log(this.state.listData)
    const { listData } = this.state;
    if (listData.length == 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'Bold' }}>Loading...</Text>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <SafeAreaView />
          <View style={styles.upperContainer}>
            <Text style={styles.headerText}>Stars World</Text>
          </View>
          <View style={styles.lowerContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={listData}
              renderItem={this.renderItem}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#edc988' },
  upperContainer: { flex: 0.1, justifyContent: 'center', alignItems: 'center' },
  headerText: { fontSize: 30, fontWeight: 'bold', color: '#132743' },
  lowerContainer: { flex: 0.9 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#d7385e' },
  listContainer: { backgroundColor: '#eeecda' },
});
