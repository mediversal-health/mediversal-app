import {StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
    margin: 0, // ensure no margin at the bottom
    padding: 0,
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

  modalTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Fonts.JakartaBold,
    color: '#0088B1',
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 12,
  },
  guideImage: {
    width: 240,
    height: 140,
    resizeMode: 'contain',
  },
  arrowIcon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{translateY: -12}],
  },
  caption: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#161D1F',
    marginBottom: 4,
  },
  description: {
    textAlign: 'center',
    fontSize: 12,
    color: '#899193',
    marginBottom: 20,
    paddingHorizontal: 8,
    fontFamily: Fonts.JakartaRegular,
  },
  closeButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#0088B1',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  captionContainer: {
    marginTop: 20,
  },

  closeButtonText: {
    color: '#0088B1',
    fontSize: 14,
    fontFamily: Fonts.JakartaSemiBold,
  },
});

export default styles;
