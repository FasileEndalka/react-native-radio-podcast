import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import KeyboardDismissView from '../component/KeyboardDismisView';
import SearchList from '../component/SearchList';
import useFetchData from '../hooks/use-fetch-data';
import {debounce} from 'lodash';

const SearchScreen = () => {
  const [value, setValue] = useState('');
  const [debouncedKey, setDebouncedKey] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((e: string) => {
      setDebouncedKey(e);
    }, 500),
    [],
  );
  const onChangeHandler = (e: any) => {
    setValue(e);
    debouncedSearch(e);
  };

  const {data, loading} = useFetchData(debouncedKey);

  return (
    <View>
      <KeyboardDismissView withScrollView={false}>
        <View>
          <View className="py-2">
            <Text
              className={` ${isDarkMode && 'text-white'}  font-bold text-xl`}>
              Search
            </Text>
          </View>
          <View className="flex-row items-center">
            <TextInput
              selectionColor={'#f87171'}
              clearButtonMode="always"
              className="bg-red-100 h-10 px-4 rounded-xl flex-1"
              onChangeText={onChangeHandler}
              value={value}
              placeholder={'Search for Country, City, Station'}
              placeholderTextColor="gray"
            />
          </View>
        </View>
      </KeyboardDismissView>
      <View className="px-4 pt-4">
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <SearchList data={data} />
        )}
      </View>
    </View>
  );
};

export default SearchScreen;
