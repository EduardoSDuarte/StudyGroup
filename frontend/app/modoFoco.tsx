import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ModoFoco() {
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
        Modo Foco 🎯
      </Text>

      <View
        style={{
          backgroundColor: "#1D2F6F",
          padding: 25,
          borderRadius: 15,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            textAlign: "center",
            lineHeight: 28,
          }}
        >
          Ative o modo foco para silenciar notificações e concentrar-se
          totalmente nos estudos.
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#2ECC71",
          padding: 18,
          borderRadius: 12,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          🎯 Ativar Modo Foco
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#E74C3C",
          padding: 18,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          ⛔ Desativar Modo Foco
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
