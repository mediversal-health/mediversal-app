/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text } from 'react-native';
import { Fonts } from '../../../styles/fonts';
import { TrackScan } from '../../../types';

interface OrderTrackingProgressProps {
  trackingData: TrackScan[];
}

const OrderTrackingProgress: React.FC<OrderTrackingProgressProps> = ({
  trackingData,
}) => {
  // Date formatting function for Indian locale
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDisplayText = (scan: string) => {
    switch (scan) {
      case 'Shipment Booked':
        return 'Confirmed';
      case 'NEW':
        return 'Order Confirmed';
      case 'IN_PROCESS':
        return 'Processing';
      case 'CANCELED':
        return 'Cancelled';
      case 'READY_FOR_DISPATCH':
        return 'Dispatched';
      case 'DELIVERED':
        return 'Delivered';
      default:
        return scan;
    }
  };

  const getStatusColor = (scan: string) => {
    return scan === 'CANCELED'
      ? '#F04438'
      : scan === 'DELIVERED' ||
        scan === 'Shipment Booked' ||
        scan === 'READY_FOR_DISPATCH' ||
        scan === 'IN_PROCESS' ||
        scan === 'NEW'
      ? '#12B76A'
      : '#667085';
  };

  const isCompleted = (scan: string) => {
    return (
      scan === 'DELIVERED' ||
      scan === 'CANCELED' ||
      scan === 'Shipment Booked' ||
      scan === 'READY_FOR_DISPATCH' ||
      scan === 'IN_PROCESS' ||
      scan === 'NEW'
    );
  };

  const trackScans = trackingData;

  return (
    <View style={{ marginHorizontal: 10, marginVertical: 20, padding: 20 }}>
      <View style={{ position: 'relative', height: 60 }}>
        <View
          style={{
            position: 'absolute',
            top: 33,
            right: 24,
            height: 2,
            backgroundColor: '#E5E8E9',
            zIndex: 1,
          }}
        />

        <View
          style={{
            position: 'absolute',
            top: 33,
            left: 0,
            width: '100%',
            height: 2,
            backgroundColor: '#12B76A',
            zIndex: 2,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 3,
          }}
        >
          {trackScans.map((step, index) => (
            <View
              key={step.rapidshyp_status_code + index}
              style={{
                alignItems:
                  index === 0
                    ? 'flex-start'
                    : index === trackScans.length - 1
                    ? 'flex-end'
                    : 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: Fonts.JakartaMedium || 'System',
                  color: getStatusColor(step.scan),
                  marginBottom: 8,
                  textAlign:
                    index === 0
                      ? 'left'
                      : index === trackScans.length - 1
                      ? 'right'
                      : 'center',
                }}
              >
                {getDisplayText(step.scan)}
              </Text>

              <View
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  backgroundColor: isCompleted(step.scan)
                    ? getStatusColor(step.scan)
                    : '#E5E8E9',
                  borderWidth: 3,
                  borderColor: 'white',
                  marginBottom: 8,
                }}
              />

              <Text
                style={{
                  fontSize: 10,
                  fontFamily: Fonts.JakartaRegular || 'System',
                  color: '#667085',
                  textAlign:
                    index === 0
                      ? 'left'
                      : index === trackScans.length - 1
                      ? 'right'
                      : 'center',
                  width: 60,
                }}
              >
                {formatDateTime(step.scan_datetime)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default OrderTrackingProgress;
