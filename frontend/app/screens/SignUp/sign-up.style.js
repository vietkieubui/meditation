import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  // main
  savMain: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'space-between',
  },

  vMain: {
    // justifyContent: 'space-between',
    // height: '100%',
    padding: 16,
    flex: 1,
  },

  // header
  tSignUpLabel: {
    fontSize: 16,
    color: '#121238',
    paddingBottom: 10,
  },

  // form
  vForm: {
    padding: 16,
    paddingVertical: 0,
    marginTop: 12,
    flex: 1,
  },

  vFullname: {},

  tFullname: {
    fontFamily: 'Averta-Bold',
    paddingBottom: 8,
  },

  vFullnameInput: {
    borderColor: '#C4C4C4',
    borderWidth: 0.5,
    borderRadius: 5,
    height: 40,
  },

  tiFullname: {
    overflow: 'hidden',
    color: '#828282',
    paddingLeft: 20,
    flex: 1,
  },

  tiFullnameActive: {
    overflow: 'hidden',
    fontFamily: 'Averta-Semibold',
    color: '#292D32',
    paddingLeft: 20,
    flex: 1,
  },

  tErrorFullname: {
    color: '#e60000',
    marginTop: 5,
  },

  vUsername: {
    marginTop: 12,
  },

  tUsername: {
    fontFamily: 'Averta-Bold',
    paddingBottom: 8,
  },

  vUsernameInput: {
    borderColor: '#C4C4C4',
    borderWidth: 0.5,
    borderRadius: 5,
    height: 40,
  },

  tiUsername: {
    overflow: 'hidden',
    color: '#828282',
    paddingLeft: 20,
    flex: 1,
  },

  tiUsernameActive: {
    overflow: 'hidden',
    fontFamily: 'Averta-Semibold',
    color: '#292D32',
    paddingLeft: 20,
    flex: 1,
  },

  tErrorUsername: {
    color: '#e60000',
    marginTop: 5,
  },

  vPhone: {
    marginTop: 12,
  },

  tPhone: {
    fontFamily: 'Averta-Bold',
    paddingBottom: 8,
  },

  vPhoneInput: {
    borderColor: '#C4C4C4',
    borderWidth: 0.5,
    borderRadius: 5,
    height: 40,
  },

  tiPhone: {
    overflow: 'hidden',
    color: '#828282',
    paddingLeft: 20,
    flex: 1,
  },

  tiPhoneActive: {
    overflow: 'hidden',
    fontFamily: 'Averta-Semibold',
    color: '#292D32',
    paddingLeft: 20,
    flex: 1,
  },

  tErrorPhone: {
    color: '#e60000',
    marginTop: 5,
  },

  vEmail: {
    marginTop: 12,
  },
  tEmail: {
    fontFamily: 'Averta-Bold',
    paddingBottom: 8,
  },

  vEmailInput: {
    borderColor: '#C4C4C4',
    borderWidth: 0.5,
    borderRadius: 5,
    height: 40,
  },

  tiEmail: {
    overflow: 'hidden',
    color: '#828282',
    paddingLeft: 20,
    flex: 1,
  },

  tiEmailActive: {
    overflow: 'hidden',
    fontFamily: 'Averta-Semibold',
    color: '#292D32',
    paddingLeft: 20,
    flex: 1,
  },

  tErrorEmail: {
    color: '#e60000',
    marginTop: 5,
  },

  toShowPassword: {
    position: 'absolute',
    top: 6,
    right: 8,
  },

  imgIconShowPassword: {},

  vPassword: {
    marginTop: 12,
  },
  tPassword: {
    fontFamily: 'Averta-Bold',
    paddingBottom: 8,
  },

  vPasswordInput: {
    borderColor: '#C4C4C4',
    borderWidth: 0.5,
    borderRadius: 5,
    height: 40,
    flexDirection: 'row',
  },

  tiPassword: {
    overflow: 'hidden',
    color: '#828282',
    paddingLeft: 20,
    flex: 1,
  },

  tiPasswordActive: {
    overflow: 'hidden',
    fontFamily: 'Averta-Semibold',
    color: '#292D32',
    paddingLeft: 20,
    flex: 1,
  },

  tErrorPassword: {
    color: '#e60000',
    marginTop: 5,
  },

  vReferralCode: {
    marginTop: 12,
  },
  tReferralCode: {
    fontFamily: 'Averta-Bold',
    paddingBottom: 8,
  },

  vReferralCodeInput: {
    borderColor: '#C4C4C4',
    borderWidth: 0.5,
    borderRadius: 5,
    height: 40,
  },

  tiReferralCode: {
    overflow: 'hidden',
    color: '#828282',
    paddingLeft: 20,
    flex: 1,
  },

  tiReferralCodeActive: {
    overflow: 'hidden',
    fontFamily: 'Averta-Semibold',
    color: '#292D32',
    paddingLeft: 20,
    flex: 1,
  },

  tErrorReferralCode: {
    color: '#e60000',
    marginTop: 5,
  },

  imgIconSwitch: {
    width: 43,
    height: 24,
  },

  teRegular: {},

  teLink: {
    color: '#8C429E',
  },

  toLogin: {
    backgroundColor: '#7A258E',
    height: 48,
    borderRadius: 4,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },

  toWaitingLogin: {
    backgroundColor: '#7A258E',
    height: 48,
    borderRadius: 4,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },

  tLogin: {
    fontFamily: 'Averta-Semibold',
    fontSize: 16,
    color: '#FFF',
  },

  // modal error
  vModalError: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 30,
    alignItems: 'center',
  },

  imgIconModalError: {
    width: 70,
  },

  tContentModalError: {
    fontFamily: 'Averta-Semibold',
    color: '#292D32',
    fontSize: 16,
    marginTop: 14,
    textAlign: 'center',
  },

  toConfirmModalError: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#7A258E',
    marginTop: 36,
    width: '100%',
  },

  tConfirmModalError: {
    fontFamily: 'Averta-Semibold',
    color: '#FFF',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});
