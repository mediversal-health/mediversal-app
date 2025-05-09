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
        marginTop: 12,
        borderWidth: 2,
        borderColor: 'green',
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
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
          backgroundColor: '#E8F4F7',
        }}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{title}</Text>
        {expanded ? (
          <ChevronUp size={20} color="#000" />
        ) : (
          <ChevronDown size={20} color="#000" />
        )}
      </TouchableOpacity>
      {expanded && <View style={{padding: 16}}>{children}</View>}
    </View>
  );
};

export default ExpandableSection;
