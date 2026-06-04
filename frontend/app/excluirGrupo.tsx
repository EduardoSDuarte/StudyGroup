import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ExcluirGrupo() {
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
        Excluir Grupo 🗑️
      </Text>

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
            color: "#ccc",
            lineHeight: 24,
          }}
        >
          Esta ação removerá permanentemente o grupo e todas as suas
          informações.
        </Text>
      </View>

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
          Confirmar Exclusão
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
