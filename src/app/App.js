import Axios from 'axios';
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  TextInput,
  SafeAreaView,
  ScrollView,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import BarcodeMask from "react-native-barcode-mask";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { width } = Dimensions.get("window");
const Stack = createNativeStackNavigator();

const ip = "172.20.10.2" // this should be changed to the local ip address 
const port = "8000"

const main_request = (ip, port, barcode) => {
  Axios.get(`http://${ip}:${port}/products/${barcode}`).then((response)=>{console.log(response)})
}


function ScannerScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    main_request(ip, port, data)
    alert(`Bar code ${data} has been scanned!`);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.container]}
      >
        <BarcodeMask
          width={300}
          height={450}
          showAnimatedLine={false}
          edgeRadius={35}
          outerMaskOpacity={0.02}
          edgeBorderWidth={6}
          edgeHeight={30}
          edgeWidth={30}
        ></BarcodeMask>
      </BarCodeScanner>
      {/* <View> */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Manual Opening")}
        style={styles.buttonOpenBinContainer}
      >
        <View style={styles.buttonOpenBinContainer.text}>
          <Text style={styles.buttonOpenBinText}>Manual Opening</Text>
        </View>
      </TouchableOpacity>
      {scanned && (
        <TouchableOpacity
          onPress={() => setScanned(false)}
          style={styles.buttonScanAgainContainer}
        >
          <Text style={styles.buttonScanAgainText}>Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function ManualOpeningScreen({ navigation }) {
  return (
    <View>
      <View style={styles.infoDiv}>
        <Text style={styles.infoDiv.text}>Learn more about</Text>
        <View style={styles.infoDiv.buttons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Info Glas Screen")}
          >
            <Image
              style={styles.imageCircle}
              source={require("./assets/manual/IG.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Info Plastic Screen")}
          >
            <Image
              style={styles.imageCircle}
              source={require("./assets/manual/IPMD.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Info Paper Screen")}
          >
            <Image
              style={styles.imageCircle}
              source={require("./assets/manual/IP.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View styles={styles.openDiv}>
        <Text style={styles.openDiv.text}>Open Manually</Text>
        <View style={styles.openDiv.buttons}>
          <TouchableOpacity onPress={() => main_request(ip, port, "0000000000003")}>
            <Image
              style={styles.openDiv.buttons.image}
              source={require("./assets/manual/OGB.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => main_request(ip, port, "0000000000001")}>
            <Image
              style={styles.openDiv.buttons.image}
              source={require("./assets/manual/OPMDB.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => main_request(ip, port, "0000000000002")}>
            <Image
              style={styles.openDiv.buttons.image}
              source={require("./assets/manual/OPB.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.statsDiv}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Statisics Screen")}
        >
          <Image
            style={styles.statsDiv.image}
            source={require("./assets/manual/S.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.scanDiv}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            style={styles.scanDiv.image}
            source={require("./assets/manual/Scan.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function InfoGlasScreen({ navigation }) {
  return (
    <View style={styles.glass}>
      <View style={styles.glass.back}>
        <TouchableOpacity onPress={() => navigation.navigate("Manual Opening")}>
          <Image
            style={styles.glass.back.images}
            source={require("./assets/glass/bb.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.glass.first}>
        <View style={styles.glass.first.background}>
          <Image
            style={styles.glass.first.background.image}
            source={require("./assets/glass/G.png")}
          />
        </View>
        <View style={styles.glass.first.text}>
          <View style={styles.glass.first.text.header}>
            <Text style={styles.glass.first.text.header.text}>
              Did you know that glass is 100% recyclable?
            </Text>
          </View>
          <View style={styles.glass.first.text.p}>
            <Text>
              Indeed every type of glass is fully recyclable! However, not every
              type of glass should go to the glass container! Dishware, flower
              pots vases and glass figurines can go to the landfield! And
              laboratory or window glass should not go into the glass container!
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.glass.second}>
        <View style={styles.glass.second.text}>
          <Text>
            Glass was discovered more than 5000 years ago and it takes one
            million years to break down naturally, that is why it is so
            important to recycle it or reuse it!
          </Text>
        </View>
        <View>
          <Image
            style={styles.glass.second.images}
            source={require("./assets/glass/clock.png")}
          />
        </View>
      </View>
      <View style={styles.glass.third}>
        <Image
          style={styles.glass.third.images}
          source={require("./assets/image-removebg-preview-(4)-1.png")}
        />
        <View style={styles.glass.third.text}>
          <Text style={styles.glass.third.text.bold}>Fun Fact: </Text>
          <Text>
            Recycling a glass jar saves enough energy to light a bulb for four
            hours.
          </Text>
        </View>
      </View>
      <View style={styles.glass.map}>
      <TouchableOpacity onPress={() => Linking.openURL("https://www.cure-afvalbeheer.nl/en/waste-recycling-point/waste-recyclingpoint-eindhoven/")}>  
          <Image
          style={styles.glass.map.mapPicture}
          source={require("./assets/glass/map.png")}
          />
      </TouchableOpacity>  
      </View>
    </View>
  );
}

function InfoPlasticScreen({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.pmd}>
        <View style={styles.pmd.back}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Manual Opening")}
          >
            <Image
              style={styles.pmd.back.images}
              source={require("./assets/pmd/bb.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.pmd.first}>
          <View style={styles.pmd.first.background}>
            <Image
              style={styles.pmd.first.background.image}
              source={require("./assets/pmd/G.png")}
            />
          </View>
          <View style={styles.pmd.first.text}>
            <View style={styles.pmd.first.text.header}>
              <Text style={styles.pmd.first.text.header.text}>
                What does PMD stand for?
              </Text>
            </View>
            <View style={styles.pmd.first.text.p}>
              <Text>
                PMD stands for Plastic Packaging, Metal Packaging and Drink
                Cartoons. Yes! In this type of trash can you can put all of the
                packaging that fill into these categories! How broad is that?
                And yes! All of the items in this trash can are sorted in a
                sorting center from where they can be recyled!
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.pmd.second}>
          <View style={styles.pmd.second.text}>
            <Text>
              Because of how much can go into the PMD recycling bin it is
              important to follow some rules when putting your trash in the
              trash can! For example do not put a plastic bag with trash/ other
              items inside of it inside of this container as all the trash goes
              to a conveyor belt who sorts per item and will consider the trash
              bag a uni and not sort its contents! Is also extremely important
              to not put any items that are of a mixture of several materials
              who cannot be seperated!
            </Text>
          </View>
          <View>
            <Image
              style={styles.pmd.second.images}
              source={require("./assets/pmd/clock.png")}
            />
          </View>
        </View>
        <View style={styles.pmd.third}>
          <Image
            style={styles.pmd.third.images}
            source={require("./assets/image-removebg-preview-(4)-1.png")}
          />
          <View style={styles.pmd.third.text}>
            <Text style={styles.pmd.third.text.bold}>Fun Fact: </Text>
            <Text>Tips for better recycling:</Text>
            <Text>Empty bottles or other packaging completely.</Text>
            <Text>
              Squash plastic bottles flat lengthways, put the lid on and save
              space in the bag.
            </Text>
            <Text>
              Remove the plastic film from dishes and throw it into the bag
              separately.
            </Text>
          </View>
        </View>
        <View style={styles.pmd.map}>
        <TouchableOpacity onPress={() => Linking.openURL("https://www.cure-afvalbeheer.nl/en/waste-recycling-point/waste-recyclingpoint-eindhoven/")}>
          <Image
            style={styles.pmd.map.mapPicture}
            source={require("./assets/pmd/map.png")}
          />
        </TouchableOpacity>  
        </View>
      </View>
    </ScrollView>
  );
}

function InfoPaperScreen({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.paper}>
        <View style={styles.paper.back}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Manual Opening")}
          >
            <Image
              style={styles.paper.back.images}
              source={require("./assets/paper/bb.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.paper.first}>
          <View style={styles.paper.first.background}>
            <Image
              style={styles.paper.first.background.image}
              source={require("./assets/paper/G.png")}
            />
          </View>
          <View style={styles.paper.first.text}>
            <View style={styles.paper.first.text.header}>
              <Text style={styles.paper.first.text.header.text}>
                Benefits of Recycling Paper
              </Text>
            </View>
            <View style={styles.paper.first.text.p}>
              <Text>
                According to The Public Recycling Officials of Pennsylvania,
                resources are conserved when paper is recycled. For every ton of
                paper that is recycled 17 trees, 60.000 gallons of water and 225
                kilowatt hours are saved! Now paper can be recycled about 5 to 7
                times! Imagine how many resources can be saved by recycling
                paper!
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.paper.second}>
          <View style={styles.paper.second.text}>
            <Text>
              Pretty much every type of paper can be recycled, magazines,
              newspapers, folders, printing paper, all cardboard packaging,
              etc,... But no dirty or greasy cardboard, wallpaper or plastic
              coated paper can be recycled in the paper bin.
            </Text>
          </View>
          <View>
            <Image
              style={styles.paper.second.images}
              source={require("./assets/paper/clock.png")}
            />
          </View>
        </View>
        <View style={styles.paper.third}>
          <Image
            style={styles.paper.third.images}
            source={require("./assets/image-removebg-preview-(4)-1.png")}
          />
          <View style={styles.paper.third.text}>
            <Text style={styles.paper.third.text.bold}>Fun Fact: </Text>
            <Text>
              Tips for better recyclingFun fact: Pollution is also reduced by 95
              percent when used paper is made into new sheets.
            </Text>
          </View>
        </View>
        <View style={styles.paper.map}>
        <TouchableOpacity onPress={() => Linking.openURL("https://www.cure-afvalbeheer.nl/en/waste-recycling-point/waste-recyclingpoint-eindhoven/")}> 
          <Image
            style={styles.paper.map.mapPicture}
            source={require("./assets/paper/map.png")}
          />
        </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

function StatisticsScreen({ navigation }) {
  let glassvar = 100;
  let pmdvar = 200;
  let papervar = 147;

  return (
    <ScrollView>
      <View style={styles.statistics}>
        <TouchableOpacity onPress={() => navigation.navigate("Manual Opening")}>
          <Image
            style={styles.statistics.images}
            source={require("./assets/bb.png")}
          />
        </TouchableOpacity>
        <View>
          <View style={styles.statistics.glass}>
            <Image
              style={styles.statistics.icons}
              source={require("./assets/glass/G.png")}
            />
            <Text style={styles.statistics.text}>
              You have recycled {glassvar} Kg
            </Text>
          </View>
          <View style={styles.statistics.graph}>
            <Image
              style={styles.statistics.graph.images}
              source={require("./assets/graph.png")}
            />
          </View>
        </View>
        <View>
          <View style={styles.statistics.pmd}>
            <Image
              style={styles.statistics.icons}
              source={require("./assets/pmd/G.png")}
            />
            <Text style={styles.statistics.text}>
              You have recycled {pmdvar} Kg
            </Text>
          </View>
          <View style={styles.statistics.graph}>
            <Image
              style={styles.statistics.graph.images}
              source={require("./assets/graph.png")}
            />
          </View>
        </View>
        <View>
          <View style={styles.statistics.paper}>
            <Image
              style={styles.statistics.icons}
              source={require("./assets/paper/G.png")}
            />
            <Text style={styles.statistics.text}>
              You have recycled {papervar} Kg
            </Text>
          </View>
          <View style={styles.statistics.graph}>
            <Image
              style={styles.statistics.graph.images}
              source={require("./assets/graph.png")}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={ScannerScreen}
          options={{
            title: "Scanner Screen",
            headerStyle: { backgroundColor: "#ffff" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Manual Opening"
          component={ManualOpeningScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Statisics Screen"
          component={StatisticsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Info Glas Screen"
          component={InfoGlasScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Info Plastic Screen"
          component={InfoPlasticScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Info Paper Screen"
          component={InfoPaperScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  imageCircle: {
    width: 0.2 * width,
    height: 0.2 * width,
  },
  image: {
    width: 0.2 * width,
    height: 0.4 * width,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  infoDiv: {
    backgroundColor: "white",
    borderBottomLeftRadius: 0.1 * width,
    borderBottomRightRadius: 0.1 * width,
    width: width,
    height: width * 0.6,
    padding: 0.1 * width,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    text: {
      fontSize: 24,
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      color: "#006E33",
      paddingTop: 0.1 * width,
    },
    buttons: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      margin: "auto",
      paddingTop: 0.05 * width,
      paddingBottom: 0.05 * width,
    },
  },

  openDiv: {
    width: width,
    height: width / 2,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    text: {
      fontSize: 24,
      color: "#006E33",
      paddingLeft: 0.05 * width,
      paddingTop: width * 0.1,
    },

    buttons: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      margin: "auto",
      padding: 0.05 * width,

      image: {
        width: 0.29 * width,
        height: 0.58 * width,
      },
    },
  },

  statsDiv: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    paddingTop: width * 0.05,
    paddingBottom: width * 0.05,

    image: {
      width: 0.9 * width,
      height: 0.276 * 0.9 * width,
    },
  },

  scanDiv: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 0.1 * width,
    borderTopRightRadius: 0.1 * width,
    padding: 0.1 * width,

    image: {
      width: 0.9 * width,
      height: 0.276 * 0.65 * 0.9 * width,
    },
  },

  glass: {
    paddingTop: width * 0.15,
    display: "flex",
    alignItems: "center",
    textAlign: "center",

    back: {
      width: width,
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      marginBottom: width * 0.05,

      images: {
        width: 0.9 * width,
        height: 0.23 * width,
      },
    },

    first: {
      width: width * 0.9,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#D9D9D9",
      padding: width * 0.05,
      borderRadius: 0.1 * width,

      background: {
        backgroundColor: "#81B44F",
        borderRadius: 0.05 * width,

        image: {
          margin: width * 0.025,
          marginTop: "auto",
          marginBottom: "auto",
          width: width * 0.25,
          height: width * 0.25,
        },

        blob: {
          height: width * 0.3,
          margin: width * 0.05,
          marginTop: 0,
          borderRadius: width * 0.025,
          backgroundColor: "#76A348",
          shadowColor: "#171717",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        },
      },

      text: {
        width: width / 2.1,

        header: {
          backgroundColor: "white",
          borderRadius: 0.025 * width,
          padding: width * 0.025,

          text: {
            fontWeight: "bold",
          },
        },

        p: {
          padding: width * 0.0125,
        },
      },
    },

    second: {
      width: width * 0.9,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: width * 0.05,
      paddingTop: width * 0.025,
      paddingBottom: width * 0.025,
      backgroundColor: "white",
      borderRadius: width * 0.1,
      marginTop: width * 0.025,

      text: {
        width: width * 0.56,
        marginTop: "auto",
        marginBottom: "auto",
      },

      images: {
        width: width * 0.3,
        height: width * 0.3,
      },
    },

    third: {
      width: width * 0.9,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: width * 0.05,
      backgroundColor: "white",
      borderRadius: width * 0.1,
      marginTop: width * 0.025,

      images: {
        width: width * 0.2,
      },

      text: {
        width: 0.6 * width,
        marginTop: "auto",
        marginBottom: "auto",

        bold: {
          fontWeight: "bold",
        },
      },
    },

    map: {
      paddingTop: width * 0.025,

      mapPicture: {
        width: width * 0.9,
        height: width * 0.23,
      },
    },
  },

  pmd: {
    paddingTop: width * 0.15,
    display: "flex",
    alignItems: "center",
    textAlign: "center",

    back: {
      width: width,
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      marginBottom: width * 0.05,

      images: {
        width: 0.9 * width,
        height: 0.23 * width,
      },
    },

    first: {
      width: width * 0.9,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#D9D9D9",
      padding: width * 0.05,
      borderRadius: 0.1 * width,

      background: {
        backgroundColor: "#C91E1E",
        borderRadius: 0.05 * width,

        image: {
          margin: width * 0.025,
          marginTop: "auto",
          marginBottom: "auto",
          width: width * 0.25,
          height: width * 0.25,
        },

        blob: {
          height: width * 0.3,
          margin: width * 0.05,
          marginTop: 0,
          borderRadius: width * 0.025,
          backgroundColor: "#76A348",
          shadowColor: "#171717",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        },
      },

      text: {
        width: width / 2.1,

        header: {
          backgroundColor: "white",
          borderRadius: 0.025 * width,
          padding: width * 0.025,

          text: {
            fontWeight: "bold",
          },
        },

        p: {
          padding: width * 0.0125,
        },
      },
    },

    second: {
      width: width * 0.9,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: width * 0.05,
      paddingTop: width * 0.025,
      paddingBottom: width * 0.025,
      backgroundColor: "white",
      borderRadius: width * 0.1,
      marginTop: width * 0.025,

      text: {
        width: width * 0.56,
        marginTop: "auto",
        marginBottom: "auto",
      },

      images: {
        width: width * 0.15,
        height: width * 0.7,
      },
    },

    third: {
      width: width * 0.9,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: width * 0.05,
      backgroundColor: "white",
      borderRadius: width * 0.1,
      marginTop: width * 0.025,

      images: {
        width: width * 0.2,
      },

      text: {
        width: 0.6 * width,
        marginTop: "auto",
        marginBottom: "auto",

        bold: {
          fontWeight: "bold",
        },
      },
    },

    map: {
      paddingTop: width * 0.025,
      paddingBottom: width * 0.05,

      mapPicture: {
        width: width * 0.9,
        height: width * 0.23,
      },
    },
  },

  paper: {
    paddingTop: width * 0.15,
    display: "flex",
    alignItems: "center",
    textAlign: "center",

    back: {
      width: width,
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      marginBottom: width * 0.05,

      images: {
        width: 0.9 * width,
        height: 0.23 * width,
      },
    },

    first: {
      width: width * 0.9,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#D9D9D9",
      padding: width * 0.05,
      borderRadius: 0.1 * width,


      background: {
        backgroundColor: "#6BB8FF",
        borderRadius: 0.05 * width,

        image: {
          margin: width * 0.025,
          marginTop: "auto",
          marginBottom: "auto",
          width: width * 0.25,
          height: width * 0.25,
        },

        blob: {
          height: width * 0.3,
          margin: width * 0.05,
          marginTop: 0,
          borderRadius: width * 0.025,
          backgroundColor: "#76A348",
          shadowColor: "#171717",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        },
      },

      text: {
        width: width / 2.1,

        header: {
          backgroundColor: "white",
          borderRadius: 0.025 * width,
          padding: width * 0.025,

          text: {
            fontWeight: "bold",
          },
        },

        p: {
          padding: width * 0.0125,
        },
      },
    },

    second: {
      width: width * 0.9,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: width * 0.05,
      paddingTop: width * 0.025,
      paddingBottom: width * 0.025,
      backgroundColor: "white",
      borderRadius: width * 0.1,
      marginTop: width * 0.025,

      text: {
        width: width * 0.56,
        marginTop: "auto",
        marginBottom: "auto",
      },

      images: {
        width: width * 0.25,
        height: width * 0.25,
        marginTop: "auto",
        marginBottom: "auto",
      },
    },

    third: {
      width: width * 0.9,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: width * 0.05,
      backgroundColor: "white",
      borderRadius: width * 0.1,
      marginTop: width * 0.025,

      images: {
        width: width * 0.2,
      },

      text: {
        width: 0.6 * width,
        marginTop: "auto",
        marginBottom: "auto",

        bold: {
          fontWeight: "bold",
        },
      },
    },

    map: {
      paddingTop: width * 0.025,
      paddingBottom: width * 0.05,

      mapPicture: {
        width: width * 0.9,
        height: width * 0.23,
      },
    },
  },

  statistics: {
    margin: width * 0.05,
    marginTop: width * 0.15,

    images: {
      width: 0.2 * width,
      height: 0.2 * width,
    },

    icons: {
      width: 0.2 * width,
      height: 0.2 * width,
      marginLeft: 0.03 * width,
      marginTop: 0.0125 * width,
    },

    graph: {
      padding: 0.005 * width,
      backgroundColor: "white",
      borderRadius: 0.05 * width,
      marginTop: 0.03 * width,
      marginBottom: 0.03 * width,
      shadowColor: "#171717",
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,

      images: {
        width: 0.82 * width,
        height: 0.5 * width,
        marginLeft: 0.025 * width,
      },
    },

    text: {
      marginLeft: "auto",
      marginRight: "auto",
      fontWeight: "bold",
      color: "white",
    },

    glass: {
      width: width * 0.9,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#81B44F",
      borderRadius: 0.05 * width,
      shadowColor: "#171717",
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },

    pmd: {
      width: width * 0.9,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#C91E1E",
      borderRadius: 0.05 * width,
      shadowColor: "#171717",
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },

    paper: {
      width: width * 0.9,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#6BB8FF",
      borderRadius: 0.05 * width,
      shadowColor: "#171717",
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
  },

  toggleCameraTypeButton: {
    backgroundColor: "black",
    padding: 20,
    borderRadius: 10,
    elevation: 8,
    paddingVertical: 15,
    paddingHorizontal: 102,
    position: "absolute",
    bottom: 400,
    borderColor: "#fff",
    borderWidth: 0.5,
  },
  toggleCameraText: {
    fontSize: 20,
    color: "#fff",
  },
  camera: {
    flex: 1,
  },
  buttonScanAgainContainer: {
    backgroundColor: "transparent",
    padding: 20,
    borderRadius: width * 0.2,
    elevation: 8,
    paddingVertical: 15,
    paddingHorizontal: 50,
    position: "absolute",
    top: "45%",
    borderColor: "black",
    borderWidth: 2.5,
  },
  buttonScanAgainText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  view: {
  },
  buttonOpenBinContainer: {
    backgroundColor: "white",
    borderRadius: width * 0.1,
    width: width,
    position: "absolute",
    bottom: 0,

    text: {
      backgroundColor: "#006E33",
      borderRadius: width * 0.05,
      width: width * 0.8,
      textAlign: "center",
      paddingTop: width * 0.05,
      paddingBottom: width * 0.05,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: width * 0.1,
      marginBottom: width * 0.1,
    },
  },
  buttonOpenBinText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",

  },
  buttonOpenBin1: {
    backgroundColor: "#797EF6",
    padding: 20,
    borderRadius: 25,
    elevation: 8,
    paddingVertical: 25,
    paddingHorizontal: 80,
    position: "absolute",
    bottom: 600,
    borderColor: "#fff",
    borderWidth: 0.5,
  },
  buttonOpenBin1Text: {
    fontSize: 20,
    color: "#fff",
  },
  buttonOpenBin2: {
    backgroundColor: "#797EF6",
    padding: 20,
    borderRadius: 25,
    elevation: 8,
    paddingVertical: 25,
    paddingHorizontal: 80,
    position: "absolute",
    bottom: 500,
    borderColor: "#fff",
    borderWidth: 0.5,
  },
  buttonOpenBin2Text: {
    fontSize: 20,
    color: "#fff",
  },
  buttonOpenBin3: {
    backgroundColor: "#797EF6",
    padding: 20,
    borderRadius: 25,
    elevation: 8,
    paddingVertical: 25,
    paddingHorizontal: 80,
    position: "absolute",
    bottom: 400,
    borderColor: "#fff",
    borderWidth: 0.5,
  },
  buttonOpenBin3Text: {
    fontSize: 20,
    color: "#fff",
  },
});

export default App;
