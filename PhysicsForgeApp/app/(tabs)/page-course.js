import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');
const CARD_SPACING = 20;
const CARD_WIDTH = width * 0.85;

export default function PageCourse() {
  const router = useRouter();

  const courses = [
    {
      title: 'Muatan dan Gaya Listrik',
      image: require('../../assets/images/muatan_dan_gaya_listrik.jpg'),
      route: '/CourseMuatanDanGayaListrik',
      isClickable: true,
    },
    {
      title: 'Dualisme Partikel Gelombang',
      image: require('../../assets/images/dualisme_partikel_gelombang.jpg'),
      isClickable: false,
    },
    {
      title: 'Energi Potensial Listrik',
      image: require('../../assets/images/energi_potensial_listrik.jpg'),
      isClickable: false,
    },
    {
      title: 'Difraksi Gelombang',
      image: require('../../assets/images/difraksi_gelombang.jpg'),
      isClickable: false,
    },
  ];

  const handlePress = (course) => {
    if (course.isClickable) {
      router.push(course.route);
    }
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
    <LinearGradient
      colors={['rgba(233, 26, 195, 0.60)', 'rgba(131, 15, 110, 0.80)']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Physics Forge</Text>
        <Text style={styles.subtitle}>Enter Metaspace</Text>
        <Text style={styles.swipeText}>Swipe Through Portals</Text>
      </View>

      {/* Courses */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + CARD_SPACING}
      >
        {courses.map((course, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(course)}
            disabled={!course.isClickable}
            style={[
              styles.courseCard,
              !course.isClickable && styles.disabledCourse,
            ]}
          >
            <LinearGradient
              colors={['#3BD1F6', 'rgba(0, 255, 255, 0.50)']}
              style={styles.cardOuterGradient}
            >
              <LinearGradient
                colors={['#1C807B', '#FF1493', '#8A2BE2']}
                style={styles.cardInnerGradient}
              >
                <ImageBackground
                  source={course.image}
                  style={styles.courseImage}
                  resizeMode="cover"
                >
                  <View style={styles.contentOverlay}>
                    <Text style={styles.courseTitle}>{course.title}</Text>
                    {!course.isClickable && (
                      <Text style={styles.comingSoonText}>Coming Soon</Text>
                    )}
                  </View>
                </ImageBackground>
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  headerContainer: {
    paddingTop: height * 0.06,
    paddingBottom: height * 0.03,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFF00',
    fontFamily: 'Orbitron-ExtraBold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 38,
    fontWeight: '700',
    color: '#FFFF00',
    fontFamily: 'Orbitron-Bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  swipeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFF00',
    fontFamily: 'Orbitron-Bold',
    textAlign: 'center',
  },
  scrollContainer: {
    paddingHorizontal: (width - CARD_WIDTH) / 2,
    paddingVertical: 20,
  },
  courseCard: {
    width: CARD_WIDTH,
    marginHorizontal: CARD_SPACING / 2,
  },
  cardOuterGradient: {
    padding: 12,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardInnerGradient: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  courseImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    justifyContent: 'flex-end',
  },
  contentOverlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 16,
  },
  courseTitle: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Orbitron-Regular',
    textAlign: 'center',
  },
  comingSoonText: {
    fontSize: 14,
    color: '#FF0000',
    fontFamily: 'Orbitron-Regular',
    textAlign: 'center',
    marginTop: 4,
  },
  disabledCourse: {
    opacity: 0.7,
  },
});