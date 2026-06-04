import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Lembretes() {
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
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 30,
        }}
      >
        Lembretes 📅
      </Text>

      <View
        style={{
          backgroundColor: "#1D2F6F",
          padding: 20,
          borderRadius: 15,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Entregar trabalho de Grafos
        </Text>

        <Text
          style={{
            color: "#ccc",
            marginTop: 5,
          }}
        >
          05/06/2026
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#1D2F6F",
          padding: 20,
          borderRadius: 15,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Prova de IA
        </Text>

        <Text
          style={{
            color: "#ccc",
            marginTop: 5,
          }}
        >
          12/06/2026
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/novoLembrete" as any)}
        style={{
          borderWidth: 1,
          borderColor: "#4F7CFF",
          borderStyle: "dashed",
          padding: 20,
          borderRadius: 15,
        }}
      >
        <Text
          style={{
            color: "#4F7CFF",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          + Adicionar Lembrete
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
