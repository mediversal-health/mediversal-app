/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ChevronDown, ChevronUp} from 'lucide-react-native';

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  title,
  children,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View
      style={{
        marginHorizontal: 16,
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#E8F4F7',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
      }}>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
          backgroundColor: '#ffffff',
          borderColor: '#E8F4F7',
          borderBottomWidth: 2,
          borderRadius: 10,
        }}>
        <Text style={{fontSize: 12, fontWeight: '500'}}>{title}</Text>
        {expanded ? (
          <ChevronUp size={16} color="#000" />
        ) : (
          <ChevronDown size={16} color="#000" />
        )}
      </TouchableOpacity>
      {expanded && <View style={{padding: 16}}>{children}</View>}
    </View>
  );
};

export default ExpandableSection;
