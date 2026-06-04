import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function RankingDiario() {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#0B1E4D",
      }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 40,
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          marginTop: 40,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "#4F7CFF",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          ← Voltar
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 30,
        }}
      >
        Ranking Diário 🏆
      </Text>

      <View
        style={{
          backgroundColor: "#1D2F6F",
          borderRadius: 18,
          padding: 20,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: "#FFD700",
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          🥇 Pietra
        </Text>

        <Text
          style={{
            color: "white",
            marginTop: 8,
            fontSize: 16,
          }}
        >
          Tempo estudado: 04h 12min
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#1D2F6F",
          borderRadius: 18,
          padding: 20,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: "#C0C0C0",
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          🥈 Nique
        </Text>

        <Text
          style={{
            color: "white",
            marginTop: 8,
            fontSize: 16,
          }}
        >
          Tempo estudado: 03h 40min
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#1D2F6F",
          borderRadius: 18,
          padding: 20,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: "#CD7F32",
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          🥉 João
        </Text>

        <Text
          style={{
            color: "white",
            marginTop: 8,
            fontSize: 16,
          }}
        >
          Tempo estudado: 02h 55min
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#1D2F6F",
          borderRadius: 18,
          padding: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          4º Maria
        </Text>

        <Text
          style={{
            color: "#ccc",
            marginTop: 5,
          }}
        >
          02h 15min
        </Text>

        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
            marginTop: 15,
          }}
        >
          5º Pedro
        </Text>

        <Text
          style={{
            color: "#ccc",
            marginTop: 5,
          }}
        >
          01h 50min
        </Text>
      </View>
    </ScrollView>
  );
}
