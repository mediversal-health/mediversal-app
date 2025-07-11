/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {TrackScan} from '../../../types';

interface OrderTrackingProgressProps {
  trackingData: TrackScan[];
}

const OrderTrackingProgress: React.FC<OrderTrackingProgressProps> = ({
  trackingData,
}) => {
  const getKeyMilestones = (scans: TrackScan[]) => {
    const statusMap: Record<string, TrackScan> = {};

    scans.forEach(scan => {
      if (scan.scan.includes('Shipment Booked')) {
        statusMap.booked = scan;
      } else if (
        scan.scan.includes('READY_FOR_DISPATCH') ||
        scan.scan.includes('Dispatched')
      ) {
        statusMap.dispatched = scan;
      } else if (
        scan.scan.includes('Out for delivery') ||
        scan.scan.includes('OFD')
      ) {
        statusMap.delivery = scan;
      } else if (scan.scan.includes('Delivered') || scan.scan.includes('DEL')) {
        statusMap.delivered = scan;
      } else if (scan.scan.includes('CANCELED')) {
        statusMap.canceled = scan;
      }
    });

    const result: TrackScan[] = [];
    if (statusMap.booked) result.push(statusMap.booked);
    if (statusMap.dispatched) result.push(statusMap.dispatched);
    if (statusMap.delivery) result.push(statusMap.delivery);
    if (statusMap.delivered) result.push(statusMap.delivered);
    if (statusMap.canceled) result.push(statusMap.canceled);

    return result.length > 0 ? result : scans.slice(-4);
  };

  const keyMilestones = getKeyMilestones(trackingData);

  const labels = keyMilestones.map(scan => {
    if (scan.scan.includes('Shipment Booked')) return 'Shipment Booked';
    if (scan.scan.includes('READY_FOR_DISPATCH')) return 'Dispatched';
    if (scan.scan.includes('Out for delivery')) return 'Out for Delivery';
    if (scan.scan.includes('Delivered')) return 'Delivered';
    if (scan.scan.includes('CANCELED')) return 'Cancelled';
    return scan.scan;
  });

  const activeIndex = keyMilestones.findIndex(
    step => step.scan.includes('Delivered') || step.scan.includes('CANCELED'),
  );

  const currentPosition =
    activeIndex === -1 ? keyMilestones.length - 1 : activeIndex;

  return (
    <View style={{paddingVertical: 16, paddingHorizontal: 8}}>
      <StepIndicator
        stepCount={labels.length}
        currentPosition={currentPosition}
        labels={labels}
        customStyles={customStepIndicatorStyles}
        renderStepIndicator={({position}) => {
          const scanText = keyMilestones[position].scan;

          const isCanceled = scanText.includes('CANCELED');
          const isDelivered = scanText.includes('Delivered');

          const backgroundColor = isCanceled
            ? '#F04438'
            : position <= currentPosition
            ? '#12B76A'
            : '#E5E8E9';

          const borderColor = isCanceled
            ? '#F04438'
            : position <= currentPosition
            ? '#12B76A'
            : '#E5E8E9';

          const textColor =
            isCanceled || position <= currentPosition ? '#fff' : '#aaa';

          const label = isCanceled
            ? '✕'
            : isDelivered || position <= currentPosition
            ? '✓'
            : `${position + 1}`;

          return (
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                borderColor,
              }}>
              <Text style={{color: textColor, fontWeight: 'bold'}}>
                {label}
              </Text>
            </View>
          );
        }}
        renderLabel={({position, label}) => {
          const scanText = keyMilestones[position].scan;
          const isCanceled = scanText.includes('CANCELED');
          const isActive = position <= currentPosition;

          return (
            <Text
              style={{
                fontSize: 12,
                color: isCanceled
                  ? '#F04438'
                  : isActive
                  ? '#101828'
                  : '#667085',
                textAlign: 'center',
                marginTop: 8,
              }}>
              {label}
            </Text>
          );
        }}
      />
    </View>
  );
};

const customStepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 35,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#12B76A',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: '#12B76A',
  stepStrokeUnFinishedColor: '#E5E8E9',
  separatorFinishedColor: '#12B76A',
  separatorUnFinishedColor: '#E5E8E9',
  stepIndicatorFinishedColor: '#12B76A',
  stepIndicatorUnFinishedColor: '#E5E8E9',
  stepIndicatorCurrentColor: '#12B76A',
  stepIndicatorLabelFontSize: 12,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fff',
  stepIndicatorLabelFinishedColor: '#fff',
  stepIndicatorLabelUnFinishedColor: '#aaa',
  labelColor: '#667085',
  labelSize: 12,
  currentStepLabelColor: '#101828',
};

export default OrderTrackingProgress;
