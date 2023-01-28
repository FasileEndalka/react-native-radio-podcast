import {View, Text, TextInput, ActivityIndicator} from 'react-native';
import React, {useState, useCallback} from 'react';
import KeyboardDismissView from '../component/KeyboardDismisView';
import SearchList from '../component/SearchList';
import useFetchData from '../hooks/use-fetch-data';
import {debounce} from 'lodash';

const SearchScreen = () => {
  const [value, setValue] = useState('');
  const [debouncedKey, setDebouncedKey] = useState('');

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
    <>
      <KeyboardDismissView withScrollView={false}>
        <View>
          <View className="py-2">
            <Text className="font-bold text-xl">Search</Text>
          </View>
          <View className="flex-row items-center">
            <TextInput
              selectionColor={'red'}
              clearButtonMode="always"
              className="bg-red-100 h-10 px-4 rounded-xl flex-1"
              onChangeText={onChangeHandler}
              value={value}
              placeholder={'Your Library'}
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
    </>
  );
};

export default SearchScreen;
