/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {TrackScan} from '../../../types';
import styles from './index.styles';
interface OrderTrackingProgressProps {
  trackingData: TrackScan[];
}

const OrderTrackingProgress: React.FC<OrderTrackingProgressProps> = ({
  trackingData,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth / 4;

  const getKeyMilestones = (scans: TrackScan[]) => {
    const milestones = [];
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

    if (statusMap.booked) {
      milestones.push(statusMap.booked);
    }
    if (statusMap.dispatched) {
      milestones.push(statusMap.dispatched);
    }
    if (statusMap.delivery) {
      milestones.push(statusMap.delivery);
    }
    if (statusMap.delivered) {
      milestones.push(statusMap.delivered);
    }
    if (statusMap.canceled) {
      milestones.push(statusMap.canceled);
    }

    return milestones.length > 0 ? milestones : scans.slice(-4);
  };

  const keyMilestones = getKeyMilestones(trackingData);
  const activeIndex = keyMilestones.findIndex(
    step => step.scan.includes('Delivered') || step.scan.includes('CANCELED'),
  );

  const getStatusColor = (scan: string, index: number) => {
    if (scan.includes('CANCELED')) {
      return '#F04438';
    }
    if (scan.includes('Delivered')) {
      return '#12B76A';
    }

    const currentActiveIndex =
      activeIndex === -1 ? keyMilestones.length - 1 : activeIndex;
    return index <= currentActiveIndex ? '#12B76A' : '#E5E8E9';
  };

  const getIcon = (scan: string, index: number) => {
    if (scan.includes('CANCELED')) {
      return '✕';
    }
    if (scan.includes('Delivered')) {
      return '✓';
    }

    const currentActiveIndex =
      activeIndex === -1 ? keyMilestones.length - 1 : activeIndex;
    return index <= currentActiveIndex ? '✓' : (index + 1).toString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.timelineContainer}>
        <View style={styles.timelineBackground} />

        <View
          style={[
            styles.timelineActive,
            {
              width: `${
                ((activeIndex === -1 ? keyMilestones.length - 1 : activeIndex) /
                  (keyMilestones.length - 1)) *
                100
              }%`,
            },
          ]}
        />

        <View style={styles.stepsContainer}>
          {keyMilestones.map((step, index) => {
            const isActive =
              index <=
              (activeIndex === -1 ? keyMilestones.length - 1 : activeIndex);
            const statusColor = getStatusColor(step.scan, index);

            return (
              <View
                key={`${step.rapidshyp_status_code}_${index}`}
                style={[styles.step, {width: itemWidth}]}>
                <View
                  style={[
                    styles.stepIcon,
                    {
                      backgroundColor: statusColor,
                      borderColor: isActive ? statusColor : '#E5E8E9',
                    },
                  ]}>
                  <Text style={styles.stepIconText}>
                    {getIcon(step.scan, index)}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.stepTitle,
                    {color: isActive ? '#101828' : '#667085'},
                  ]}>
                  {step.scan.includes('Shipment Booked')
                    ? 'Shipment Booked'
                    : step.scan.includes('READY_FOR_DISPATCH')
                    ? 'Dispatched'
                    : step.scan.includes('Out for delivery')
                    ? 'Out for delivery'
                    : step.scan.includes('Delivered')
                    ? 'Delivered'
                    : step.scan.includes('CANCELED')
                    ? 'Cancelled'
                    : step.scan}
                </Text>

                {/* <Text style={styles.stepDate}>
                  {(step.scan_datetime).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text> */}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default OrderTrackingProgress;
