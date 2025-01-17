import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PanResponder, Dimensions, TextInput, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function PagePraktikum() {
  // State management
  const [negativeCharge, setNegativeCharge] = useState(0);
  const [handPosition, setHandPosition] = useState({
    x: width * 0.4,
    y: height * 0.25
  });
  const [showChargeEffect, setShowChargeEffect] = useState(false);
  const [isRubbingWool, setIsRubbingWool] = useState(false);
  const [paperPosition, setPaperPosition] = useState({ x: width * 0.1, y: height * 0.4 });
  const [isPaperFollowing, setIsPaperFollowing] = useState(false);
  
  // Refs for tracking positions and intervals
  const chargeIntervalRef = useRef(null);
  const practiceAreaRef = useRef(null);
  const woolBoundsRef = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const practiceAreaBounds = useRef({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    return () => {
      if (chargeIntervalRef.current) {
        clearInterval(chargeIntervalRef.current);
      }
    };
  }, []);

  // Position constraint helper
  const constrainPosition = (x, y) => {
    const bounds = practiceAreaBounds.current;
    const handSize = width * 0.15;

    return {
      x: Math.max(0, Math.min(x, bounds.width - handSize)),
      y: Math.max(0, Math.min(y, bounds.height - handSize))
    };
  };

  // Collision detection helper
  const checkWoolCollision = (handX, handY) => {
    const woolBounds = woolBoundsRef.current;
    const handSize = width * 0.15;

    return (
      handX < woolBounds.x + woolBounds.width &&
      handX + handSize > woolBounds.x &&
      handY < woolBounds.y + woolBounds.height &&
      handY + handSize > woolBounds.y
    );
  };

  // Pan responder for hand movement
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      const { x, y } = constrainPosition(
        gestureState.moveX - practiceAreaBounds.current.x,
        gestureState.moveY - practiceAreaBounds.current.y
      );

      setHandPosition({ x, y });

      // Check collision with wool
      const isColliding = checkWoolCollision(x, y);
      
      if (isColliding && !isRubbingWool) {
        setIsRubbingWool(true);
        chargeIntervalRef.current = setInterval(() => {
          setNegativeCharge(prev => prev + 1);
          setShowChargeEffect(true);
        }, 200); // Faster charging
      } else if (!isColliding && isRubbingWool) {
        setIsRubbingWool(false);
        if (chargeIntervalRef.current) {
          clearInterval(chargeIntervalRef.current);
          setShowChargeEffect(false);
        }
      }

      // Update paper position if it's following the hand
      if (isPaperFollowing && negativeCharge > 5) {
        setPaperPosition({
          x: x + Math.random() * 10 - 5, // Add slight random movement
          y: y + Math.random() * 10 - 5
        });
      }
    },
    onPanResponderRelease: () => {
      setIsRubbingWool(false);
      if (chargeIntervalRef.current) {
        clearInterval(chargeIntervalRef.current);
        setShowChargeEffect(false);
      }
      
      // Check if hand is near paper
      const distance = Math.sqrt(
        Math.pow(handPosition.x - paperPosition.x, 2) +
        Math.pow(handPosition.y - paperPosition.y, 2)
      );
      
      if (distance < width * 0.2 && negativeCharge > 5) {
        setIsPaperFollowing(true);
      } else {
        setIsPaperFollowing(false);
      }
    },
  });

  const onPracticeAreaLayout = (event) => {
    const { x, y, width: areaWidth, height: areaHeight } = event.nativeEvent.layout;
    practiceAreaBounds.current = { x, y, width: areaWidth, height: areaHeight };
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      <LinearGradient
        colors={['rgba(233, 26, 195, 0.60)', 'rgba(131, 15, 110, 0.80)']}
        style={styles.container}
      >
        <Text style={styles.headerText}>Charge and Stick!</Text>

        <View 
          style={styles.practiceArea}
          onLayout={onPracticeAreaLayout}
          ref={practiceAreaRef}
        >
          {/* Hand (represented by a circular touch area) */}
          <View 
            {...panResponder.panHandlers} 
            style={[
              styles.hand,
              {
                transform: [
                  { translateX: handPosition.x },
                  { translateY: handPosition.y }
                ],
              }
            ]}
          >
            <View style={[styles.handIndicator, isRubbingWool && styles.handRubbing]} />
          </View>

          {/* Wool Cloth */}
          <View 
            style={styles.woolCloth}
            onLayout={(event) => {
              const { x, y, width, height } = event.nativeEvent.layout;
              woolBoundsRef.current = { x, y, width, height };
            }}
          >
            <Image
              source={require('../../assets/images/kain_wol.png')}
              style={styles.woolImage}
              resizeMode="contain"
            />
          </View>

          {/* Paper Pieces */}
          <View style={[
            styles.papers,
            {
              transform: [
                { translateX: paperPosition.x },
                { translateY: paperPosition.y }
              ],
              opacity: isPaperFollowing ? 0.8 : 1,
            }
          ]}>
            <Image
              source={require('../../assets/images/shredded-papers.png')}
              style={styles.paperImage}
              resizeMode="contain"
            />
          </View>

          {showChargeEffect && (
            <View style={[
              styles.chargeEffectContainer,
              {
                left: handPosition.x + width * 0.075,
                top: handPosition.y - 20
              }
            ]}>
              <Text style={styles.chargeText}>-</Text>
            </View>
          )}
        </View>

        <View style={styles.chargeDisplay}>
          <Text style={styles.chargeText}>Negative Charge: {negativeCharge}</Text>
        </View>

        <Text style={styles.instructionText}>
          1. Gesek kain wol dengan jari untuk menghasilkan muatan
          2. Dekatkan jari ke serpihan kertas untuk menariknya
        </Text>

        <Text style={styles.conclusionLabel}>Write Your Conclusion:</Text>
        <TextInput
          style={styles.conclusionInput}
          placeholder="Explain what happened in the experiment..."
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={() => console.log('Submitted')}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    minHeight: height,
    padding: 20,
  },
  headerText: {
    fontSize: 32,
    color: '#FFFF00',
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
  },
  instructionText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginVertical: 10,
    lineHeight: 24,
  },
  practiceArea: {
    width: '100%',
    height: height * 0.5,
    backgroundColor: '#000',
    borderRadius: 20,
    position: 'relative',
    marginVertical: 20,
    overflow: 'hidden',
  },
  hand: {
    width: width * 0.15,
    height: width * 0.15,
    position: 'absolute',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  handIndicator: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 2,
    borderColor: 'white',
  },
  handRubbing: {
    backgroundColor: 'rgba(0, 255, 255, 0.3)',
    transform: [{ scale: 1.2 }],
  },
  woolCloth: {
    position: 'absolute',
    top: '10%',
    right: '10%',
    width: width * 0.15,
    height: width * 0.15,
  },
  woolImage: {
    width: '100%',
    height: '100%',
  },
  papers: {
    position: 'absolute',
    width: width * 0.15,
    height: width * 0.15,
  },
  paperImage: {
    width: '100%',
    height: '100%',
  },
  chargeEffectContainer: {
    position: 'absolute',
    backgroundColor: '#00FFFF',
    padding: 10,
    borderRadius: 20,
    zIndex: 3,
  },
  chargeDisplay: {
    backgroundColor: '#00FFFF',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  chargeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  conclusionLabel: {
    fontSize: 24,
    color: '#FFFF00',
    marginVertical: 10,
  },
  conclusionInput: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    minHeight: 100,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#00FFFF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    width: '60%',
    alignSelf: 'center',
  },
  submitText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});