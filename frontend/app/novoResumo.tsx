import { router } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity } from "react-native";

export default function NovoResumo() {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#0B1E4D",
      }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 40,
        flexGrow: 1,
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
        Novo Resumo 📝
      </Text>

      <TextInput
        placeholder="Título"
        placeholderTextColor="#999"
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: 15,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Digite seu resumo..."
        placeholderTextColor="#999"
        multiline
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: 15,
          height: 200,
          textAlignVertical: "top",
          marginBottom: 20,
        }}
      />

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
          Salvar Resumo
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
