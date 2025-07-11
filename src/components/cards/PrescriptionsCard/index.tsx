/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {ChevronRight, FileText} from 'lucide-react-native';

import styles from './index.styles';
import {Fonts} from '../../../styles/fonts';

const PrescriptionsCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          justifyContent: 'space-between',
        }}>
        <View>
          <View style={{flexDirection: 'row', gap: 5}}>
            <View style={styles.iconWrapper}>
              <FileText />
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.name}>Prescription ID</Text>
              <Text style={styles.orderId}>RX-2023-001</Text>
            </View>
            <View
              style={{
                backgroundColor: '#FFD3D3',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 6,
                height: 25,
              }}>
              <Text
                style={{
                  fontFamily: Fonts.JakartaRegular,
                  fontSize: 10,
                  padding: 5,
                  color: '#EB5757',
                }}>
                Clarification Needed
              </Text>
            </View>
          </View>
        </View>

        <ChevronRight />
      </View>
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <View style={styles.rightContent}>
          <View style={{flexDirection: 'row', gap: 5}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}} />
            <View style={{flexDirection: 'column', gap: 2}}>
              <Text
                style={{
                  fontFamily: Fonts.JakartaRegular,
                  fontSize: 8,
                  color: '#899193',
                }}>
                Patient Name
              </Text>
              <Text style={styles.amount}>Firoz Ansari</Text>
            </View>
          </View>
        </View>
        <View style={styles.rightContent}>
          <View style={{flexDirection: 'row', gap: 5}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}} />
            <View style={{flexDirection: 'column', gap: 2}}>
              <Text
                style={{
                  fontFamily: Fonts.JakartaRegular,
                  fontSize: 8,
                  color: '#899193',
                }}>
                Uploaded on
              </Text>
              <Text style={styles.amount}>22 Jun 2025</Text>
            </View>
          </View>
        </View>
        <View style={styles.rightContent}>
          <View style={{flexDirection: 'row', gap: 5}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}} />
            <View style={{flexDirection: 'column', gap: 2}}>
              <Text
                style={{
                  fontFamily: Fonts.JakartaRegular,
                  fontSize: 8,
                  color: '#899193',
                }}>
                Expiry Date
              </Text>
              <Text style={styles.amount}>22 July 2025</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PrescriptionsCard;
