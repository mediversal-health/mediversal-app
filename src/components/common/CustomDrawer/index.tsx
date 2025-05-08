/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {ChevronRight, Plus, Check} from 'lucide-react-native';
import OptiionsItem from '../../ui/Drawer/ServiceOptions';
import OtherOptionsItem from '../../ui/Drawer/OtherOptions';
import styles from './index.styles';
const CustomDrawer = ({onClose}: {onClose: () => void}) => {
  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <View style={styles.drawer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.header}>
                <View style={styles.profileRow}>
                  <Image
                    source={require('../../../assests/pngs/MainAvatar.png')}
                    style={styles.avatar}
                  />
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.greeting}>Namaste, Guest</Text>
                    <View style={styles.profileProgress}>
                      <Text style={styles.completeText}>
                        Complete your profile (9% Done)
                      </Text>
                      <ChevronRight size={20} color={'#0088B1'} />
                    </View>
                    <Text style={styles.percentComplete}>9% Completed</Text>
                  </View>
                </View>

                <View style={styles.familySection}>
                  <View style={styles.familyHeader}>
                    <Text style={styles.familyTitle}>Family members</Text>
                    <TouchableOpacity style={styles.addNew}>
                      <Plus
                        size={10}
                        style={{marginTop: 3}}
                        color={'#B0B6B8'}
                      />
                      <Text style={styles.addNewText}>Add New</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.familyTags}>
                    {['Spouse', 'Mom', 'Dad'].map((label, index) => (
                      <View key={index} style={styles.familyTag}>
                        <Text style={styles.tagText}>{label}</Text>
                        <Check
                          size={12}
                          style={{marginTop: 3}}
                          color={'#fff'}
                        />
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              <Text style={styles.sectionHeader}>Our Services</Text>
              <OptiionsItem
                title="Buy Medicines"
                description="Get Medicine at 25% OFF"
              />
              <OptiionsItem
                title="Homecare"
                description="Medical Care & Support at Home"
              />
              <OptiionsItem
                title="Online Consultation"
                description="Talk to Doctor in 10 minute"
              />
              <OptiionsItem
                title="Lab & Diagnostic Tests"
                description="(NABL Certified) Reliable & Quick Reports"
              />
              <OptiionsItem
                title="Health Checkups"
                description="Full Health Checks for your Family"
              />
              <OptiionsItem
                title="Elder Care Program"
                description="Personalized Senior Care at Home"
              />
              <OptiionsItem
                title="Surgeries"
                description="(NABH Accredited) Safe Surgeries by Experts"
              />

              <Text style={styles.sectionHeader}>Records</Text>
              <OtherOptionsItem title="My Orders" />
              <OtherOptionsItem title="Health Reports" />
              <OtherOptionsItem title="Bill & Invoice" />

              <Text style={styles.sectionHeader}>About us</Text>
              <OtherOptionsItem title="Help & Support" />
              <OtherOptionsItem title="About Mediversal App" />
              <OtherOptionsItem title="Terms & Conditions" />
              <OtherOptionsItem title="Privacy Policy" />
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomDrawer;
