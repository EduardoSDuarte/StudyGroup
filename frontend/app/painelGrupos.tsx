import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function PainelGrupos() {
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
          marginBottom: 25,
        }}
      >
        Painel de Grupos 📚
      </Text>

      <View
        style={{
          backgroundColor: "#1D2F6F",
          padding: 20,
          borderRadius: 15,
          marginBottom: 15,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Grupos cadastrados
        </Text>

        <Text style={{ color: "#ccc", marginTop: 10 }}>Total: 42</Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#E67E22",
          padding: 15,
          borderRadius: 12,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Suspender Grupo
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#E74C3C",
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
          Excluir Grupo
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
