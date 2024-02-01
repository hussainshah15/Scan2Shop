import React, { useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // requires installation of 'react-native-vector-icons' package and linking the package (see package documentation for more details)

const SearchBar = ({ searchCallback }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    searchCallback(searchTerm);
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        onChangeText={setSearchTerm}
        value={searchTerm}
        onSubmitEditing={handleSearch}
      />
      <Icon
        name="search"
        size={24}
        color="black"
        style={styles.searchIcon}
        onPress={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal:10

  },
  searchInput: {
    flex: 1,
    height: 40,
    padding: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
});

export default SearchBar;
