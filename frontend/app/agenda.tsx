import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Agenda() {
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
        Agenda Compartilhada 📅
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
          📚 Entrega Trabalho de Grafos
        </Text>

        <Text
          style={{
            color: "#ccc",
            marginTop: 8,
          }}
        >
          10/06/2026 - 23:59
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
          🤖 Prova de IA
        </Text>

        <Text
          style={{
            color: "#ccc",
            marginTop: 8,
          }}
        >
          15/06/2026 - 19:00
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#1D2F6F",
          padding: 20,
          borderRadius: 15,
          marginBottom: 25,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          🎤 Apresentação do Projeto
        </Text>

        <Text
          style={{
            color: "#ccc",
            marginTop: 8,
          }}
        >
          20/06/2026 - 08:00
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#4F7CFF",
          padding: 15,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          + Adicionar Evento
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
