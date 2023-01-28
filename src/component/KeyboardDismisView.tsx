import {Keyboard, ScrollView, TouchableOpacity} from 'react-native';
import React, {PropsWithChildren} from 'react';

interface Props {
  withScrollView: boolean;
  children: React.ReactNode | React.ReactNode[];
}
const KeyboardDismissView: React.FC<Props> = (
  props: PropsWithChildren<Props>,
) => {
  if (props.withScrollView) {
    return (
      <ScrollView keyboardShouldPersistTaps={'never'}>
        {props.children}
      </ScrollView>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={Keyboard.dismiss}
      className="px-4">
      {props.children}
    </TouchableOpacity>
  );
};

export default KeyboardDismissView;
