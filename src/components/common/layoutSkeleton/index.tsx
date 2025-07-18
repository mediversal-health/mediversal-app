import React from 'react';
import {View} from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const HeaderSkeleton = () => {
  return (
    <>
      {/* Top Header Section */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingBottom: 0,
          marginTop: 30,
          marginBottom: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* Profile Image Skeleton */}
          <ShimmerPlaceholder
            style={{
              width: 40,
              height: 40,
              borderRadius: 25,
              marginRight: 10,
            }}
          />

          {/* Delivery Info Skeleton */}
          <View style={{flexDirection: 'column'}}>
            <ShimmerPlaceholder
              style={{
                width: 80,
                height: 14,
                marginBottom: 6,
                borderRadius: 4,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
              }}>
              <ShimmerPlaceholder
                style={{
                  width: 150,
                  height: 14,
                  borderRadius: 4,
                }}
              />
              <View style={{flex: 1}} />
              <ShimmerPlaceholder
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                }}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Notification Section */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          marginBottom: 16,
        }}>
        <View>
          <ShimmerPlaceholder
            style={{
              width: 200,
              height: 12,
              marginBottom: 6,
              borderRadius: 4,
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <ShimmerPlaceholder
              style={{
                width: 100,
                height: 12,
                borderRadius: 4,
              }}
            />
            <View style={{width: 10}} />
            <ShimmerPlaceholder
              style={{
                width: 60,
                height: 12,
                borderRadius: 4,
              }}
            />
          </View>
        </View>
        <ShimmerPlaceholder
          style={{
            width: 50,
            height: 30,
            borderRadius: 15,
          }}
        />
      </View>

      {/* Search Bar Section */}
      <View style={{paddingHorizontal: 16, paddingBottom: 16}}>
        <ShimmerPlaceholder
          style={{
            height: 40,
            borderRadius: 8,
          }}
        />
      </View>
    </>
  );
};

export default HeaderSkeleton;
