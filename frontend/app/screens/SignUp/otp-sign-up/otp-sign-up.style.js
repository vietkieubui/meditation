import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  savMain: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },

  vMain: {
    // justifyContent: 'space-between',
    height: '100%',
    padding: 16,
  },

  navMenu: {
    color: '#121238',
    fontFamily: 'Averta-Semibold',
    fontSize: 18,
    paddingLeft: 30,
  },

  tLabel: { fontSize: 16, color: '#121238' },

  tLabelBold: {
    fontFamily: 'Averta-Semibold',
    fontSize: 16,
    color: '#121238',
  },

  borderStyleBase: {},

  borderStyleHighLighted: {
    borderColor: 'green',
  },

  underlineStyleBase: {
    borderWidth: 0,
    borderRadius: 0,
    borderBottomWidth: 3,
    borderColor: '#828282',
    color: '#000',
    fontFamily: 'Averta-Semibold',
    fontSize: 36,
  },

  underlineStyleHighLighted: {
    borderColor: '#8C429E',
    borderBottomWidth: 3,
  },

  otpBoxesContainer: {
    flexDirection: 'row',
  },

  otpBox: {
    flex: 1,
    marginHorizontal: 10,
    borderWidth: 0,
    borderRadius: 0,
    borderBottomWidth: 3,
    borderColor: '#828282',
  },

  otpBoxError: {
    flex: 1,
    marginHorizontal: 10,
    borderWidth: 0,
    borderRadius: 0,
    borderBottomWidth: 3,
    borderColor: '#EC404A',
  },

  otpBoxSelect: {
    flex: 1,
    marginHorizontal: 10,
    borderWidth: 0,
    borderRadius: 0,
    borderBottomWidth: 3,
    borderColor: '#7A258E',
    color: '#000',
  },

  txtOtp: {
    textAlign: 'center',
    fontFamily: 'Averta-Semibold',
    fontSize: 36,
  },

  teLink: {
    fontSize: 16,
    color: '#8C429E',
    paddingTop: 16,
    paddingBottom: 5,
  },

  teRegular: {
    fontSize: 16,
    paddingTop: 30,
    paddingBottom: 10,
    textDecorationLine: 'underline',
  },

  teRegularNone: {
    fontSize: 16,
    paddingTop: 30,
    paddingBottom: 10,
    color: '#C4C4C4',
    textDecorationLine: 'underline',
  },

  tErrorOtp: {
    color: '#e60000',
    marginTop: 16,
  },

  toWaitingLogin: {
    backgroundColor: '#7A258E',
    height: 48,
    borderRadius: 4,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    opacity: 0.7,
  },

  toLogin: {
    backgroundColor: '#7A258E',
    height: 48,
    borderRadius: 4,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },

  tLogin: {
    fontFamily: 'Averta-Semibold',
    fontSize: 16,
    color: '#FFF',
  },
});
