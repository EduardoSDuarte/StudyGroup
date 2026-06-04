import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function RankingMensal() {
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
        Ranking Mensal 📊
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
          }}
        >
          72 horas estudadas
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
          }}
        >
          69 horas estudadas
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
          }}
        >
          61 horas estudadas
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
          }}
        >
          4º Maria — 54h
        </Text>

        <Text
          style={{
            color: "white",
            fontSize: 18,
            marginTop: 10,
          }}
        >
          5º Pedro — 48h
        </Text>

        <Text
          style={{
            color: "white",
            fontSize: 18,
            marginTop: 10,
          }}
        >
          6º Ana — 42h
        </Text>
      </View>
    </ScrollView>
  );
}
