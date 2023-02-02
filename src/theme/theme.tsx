import {DefaultTheme} from '@react-navigation/native';

export const darkTheme = {
  ...DefaultTheme,
  colors: {
    primary: 'rgb(241, 241, 245)',
    background: 'rgb(28, 28, 30)',
    card: 'rgb(28, 28, 30)',
    text: 'white',
    border: 'rgb(241, 241, 245)',
    notification: 'rgb(236, 124, 118)',
  },
};
export const lightTheme = {
  ...DefaultTheme,
  colors: {
    primary: '#f87171',
    background: 'rgb(241, 241, 245)',
    card: 'rgb(241, 241, 245)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(28, 28, 30)',
    notification: 'rgb(236, 124, 118)',
  },
};
