import { Platform, StyleSheet } from 'react-native';
import { Fonts } from '../../../styles/fonts';

const styles = StyleSheet.create({
  arrowIcon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  caption: {
    color: '#161D1F',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'center',
  },

  captionContainer: {
    marginTop: 20,
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#0088B1',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: Platform.OS === 'ios' ? 26 : 0,
    marginTop: 16,
    paddingVertical: 12,
  },
  closeButtonText: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaSemiBold,
    fontSize: 14,
  },
  description: {
    color: '#899193',
    fontFamily: Fonts.JakartaRegular,
    fontSize: 12,
    marginBottom: 20,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  guideImage: {
    height: 140,
    resizeMode: 'contain',
    width: 240,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '70%',
    justifyContent: 'space-between',
    alignSelf: 'flex-end', // ensure it sticks to bottom
    marginBottom: 0, // prevent any bottom margin
    paddingBottom: 0, // remove padding from bottom
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
    margin: 0, // ensure no margin at the bottom
    padding: 0,
  },

  modalTitle: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaBold,
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default styles;
