import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './index.styles';
type InfoBoxProps = {
  heading: string;
  subHeading: string;
  colors: string;
  SvgComponent: React.FC<any>;
  flag?: string;
};

const InfoBox: React.FC<InfoBoxProps> = ({
  heading,
  subHeading,
  colors,
  SvgComponent,
  flag,
}) => {
  return (
    <LinearGradient
      colors={[colors, '#FFFFFF']}
      style={styles.container}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}>
      {/* {flag === 'Online' && (
        <LinearGradient
          colors={['#003A4B', '#0088B1']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          style={styles.banner}>
          <Text style={styles.bannerText}>Doctor's in 10 minutes</Text>
        </LinearGradient>
      )} */}

      <View style={styles.content}>
        <View>
          <Text style={styles.heading}>
            {heading}
            {flag === 'Tests' && (
              <Text style={styles.subHeading}>(NABL certified)</Text>
            )}
          </Text>
          {flag === 'Tests' && (
            // eslint-disable-next-line react-native/no-inline-styles
            <Text style={{ fontSize: 10, color: '#000', textAlign: 'center' }}>
              & Diagnostic Tests
            </Text>
          )}
          <Text style={styles.subHeading} numberOfLines={2}>
            {subHeading}
          </Text>
        </View>
        {flag === 'Homecare' ? (
          <SvgComponent width={50} height={60} />
        ) : flag === 'Online' ? (
          <SvgComponent width={70} height={40} />
        ) : flag === 'Tests' ? (
          <SvgComponent width={70} height={40} />
        ) : flag === 'Checkup' ? (
          <SvgComponent width={70} height={40} />
        ) : flag === 'Surgeries' ? (
          <SvgComponent width={70} height={80} />
        ) : (
          <SvgComponent width={40} height={40} />
        )}
      </View>
    </LinearGradient>
  );
};

export default InfoBox;
